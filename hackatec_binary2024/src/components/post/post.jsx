import { Box, Typography, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid2';

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

import React, { useState } from 'react';
import { db, storage } from '../../../firebaseconfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

import './post.css'

export default function login(){
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        eventTime: '',
        price: '',
        maxPeople: '',       // Campo para el límite de personas
        location: '',        // Campo para la ubicación
        category: '',        // Campo para la categoría
        isClosed: false      // Campo para cerrar el viaje
      });
      const [status, setStatus] = useState({ error: '', success: '' });
    
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'file' ? files[0] : value
        });
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          if (file.size > MAX_IMAGE_SIZE) {
            alert('La imagen seleccionada es demasiado grande. Por favor, selecciona una imagen más pequeña.');
            e.target.value = null;
          } else {
            setFormData({ ...formData, image: file });
          }
        }
      };
    
      const uploadImage = async (image) => {
        const imageRef = ref(storage, `images/${image.name}`);
        try {
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        } catch (error) {
          console.error('Error al subir la imagen:', error);
          throw new Error('Error al subir la imagen');
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { title, description, image, eventTime, price, maxPeople, location, category, isClosed } = formData;
        if (!title || !description || !image || !eventTime || !price || !maxPeople || !location || !category) {
          setStatus({ error: 'Todos los campos son obligatorios.', success: '' });
          return;
        }
    
        try {
          const imageURL = await uploadImage(image);
          await addDoc(collection(db, 'posts'), {
            title,
            description,
            imageURL,
            eventTime,
            price,
            maxPeople,       // Añadir el límite de personas
            location,        // Añadir la ubicación
            category,        // Añadir la categoría
            isClosed,        // Añadir el estado de cerrado
            timestamp: new Date().toISOString()
          });
    
          setStatus({ error: '', success: 'Publicación creada exitosamente.' });
          setFormData({ title: '', description: '', image: null, eventTime: '', price: '', maxPeople: '', location: '', category: '', isClosed: false });
        } catch (error) {
          setStatus({ error: error.message, success: '' });
        }
      };

    document.title = 'Horizon360 - Posting...';
    return (
        <Box class='frosted box' >
            <Grid container spacing={2} columns={1}>
                <Grid size={2}/>
                <Grid size={1}>
                    <Typography
                    variant="h4"
                    textAlign={"center"}
                    >
                    Create post</Typography>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Title</InputLabel>
                    <OutlinedInput
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Description</InputLabel>
                        <OutlinedInput
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Date</InputLabel>
                        <OutlinedInput
                            type="datetime-local"
                            id="eventTime"
                            name="eventTime"
                            value={formData.eventTime}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Price</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Limit of people</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="maxPeople"
                            name="maxPeople"
                            value={formData.maxPeople}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Ubication</InputLabel>
                        <OutlinedInput
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Category</InputLabel>
                        <OutlinedInput
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Closing date</InputLabel>
                        <OutlinedInput
                            type="checkbox"
                            id="isClosed"
                            name="isClosed"
                            checked={formData.isClosed}
                            onChange={(e) => setFormData({ ...formData, isClosed: e.target.checked })}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Image</InputLabel>
                        <OutlinedInput
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid size={2}>
                    <Button color="White" variant="outlined" endIcon={<SendIcon />}>
                    Submit
                    </Button>
                </Grid>
                <Grid size={2}/>
            </Grid>
        </Box>
    )
}