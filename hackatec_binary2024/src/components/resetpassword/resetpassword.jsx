import { Box, Typography, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { auth } from '../../../firebaseconfig'; // Asegúrate de que la ruta es correcta
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './resetpassword.css'

export default function resetpassword(){
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClose1 = () => {
        setOpen1(false);
    };

    const [open2, setOpen2] = React.useState(false);

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    document.title = 'Horizon360 - ResetPassword';

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
        await sendPasswordResetEmail(auth, email);
        handleClickOpen1();
        } catch (error) {
        handleClickOpen2();
        }
    };

    return (
        <Box class='frosted box' >
            <Grid container spacing={2} columns={1}>
                <Grid size={2}/>
                <Grid size={1}>
                    <Typography
                    variant="h4"
                    textAlign={"center"}
                    >
                    Reset password</Typography>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            label="Email"
                        />
                    </FormControl>
                </Grid>
                <Grid size={2}>
                    <Button color="White" variant="outlined" endIcon={<SendIcon />} onClick={handleResetPassword}>
                    Send Email
                    </Button>
                </Grid>
                <Grid size={2}/>
            </Grid>

            <Dialog
                open={open1}
                onClose={handleClose1}
            >
                <DialogTitle id="alert-dialog-title">
                {"Email sent"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Password reset email sent! Please check your inbox.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose1} autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open2}
                onClose={handleClose2}
            >
                <DialogTitle id="alert-dialog-title">
                {"Error"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    There has been an error, make sure that the Email is correctly written.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose2} autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>

        </Box>
        
    )
}