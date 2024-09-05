import { Box, Typography, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

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

import './register.css'

export default function register(){
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/login');
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    
    document.title = 'Horizon360 - Register';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario registrado:', userCredential.user);
        handleClickOpen(); // Redirigir a la página de bienvenida
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
                    Register</Typography>
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
                <Grid size={1}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </FormControl>
                </Grid>
                <Grid size={2}>
                    <Button color="secondary" variant="outlined" endIcon={<SendIcon />} onClick={handleRegister}>
                    Submit
                    </Button>
                </Grid>
                <Grid size={2}/>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                {"Welcome"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Registered correctly.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
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
                    An error has been encountered, check if your account has been already created.
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