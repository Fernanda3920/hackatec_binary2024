import { Box, Typography, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid2';

import React, { useState } from 'react';
import { auth } from '../../../firebaseconfig'; // Asegúrate de que la ruta es correcta
import { signInWithEmailAndPassword } from 'firebase/auth';
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

import './login.css'

export default function login(){
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
        navigate('/postslist');
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Usuario logueado:', user);
        console.log('UID del usuario:', user.uid); // Imprimir el UID en la consola

        // Redirigir a la página de /post con el UID como estado
        handleClickOpen()
        } catch (error) {
        handleClickOpen2()
        }
    };

    document.title = 'Horizon360 - Log in';
    return (
        <Box class='frosted box' >
            <Grid container spacing={2} columns={1}>
                <Grid size={2}/>
                <Grid size={1}>
                    <Typography
                    variant="h4"
                    textAlign={"center"}
                    >
                    Log in</Typography>
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
                    <Button color="secondary" variant="outlined" endIcon={<SendIcon />} onClick={handleLogin}>
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
                {"Welcome back"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Logged in succesfuly.
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
                    An error has been encountered, check if your account have registered.
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