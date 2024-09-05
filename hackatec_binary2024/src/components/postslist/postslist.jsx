import { Box, Typography, Button, TextField, Grid2 } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseconfig'; // Asegúrate de que la ruta es correcta
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './postslist.css'

const heights = [150, 230, 190, 170, 210, 150, 230, 180, 150, 190, 200, 150, 230, 150, 180];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    color: theme.palette.text.secondary,
    backgroundColor: '#1A202722',
}));

export default function postlist(){
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    document.title = 'Horizon360 - Looking for adventure?';

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const postsCollection = collection(db, 'posts');
        const q = query(postsCollection, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPosts(postsData);
        setLoading(false);
        });

    return () => unsubscribe(); // Cleanup cuando se desmonte el componente
    }, []);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
        setSearchTerm(searchInput);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Cargando publicaciones...</div>;
    }

    return (
        <>
        <React.Fragment>
            <Dialog class="dialog"
                open={open}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
        <Box class='frosted box'>
            <Box class='box'>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Search...</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        label="Search...."
                        type="text" 
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                    />
                </FormControl>
                <Masonry columns={3} spacing={5} sequential >
                {filteredPosts.map((post) => (
                    <Paper class="paper">
                        <StyledAccordion sx={{ backgroundColor:'#1A202722' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid2 container spacing={2} columns={1}>
                                <Grid2 size={1}>
                                    <Typography>{post.title}</Typography>
                                </Grid2>
                                <Grid2 size={1}>
                                    <img
                                        src={post.imageURL}
                                        alt={post.title}
                                        loading="lazy"
                                        style={{
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                            display: 'block',
                                            width: '90%',
                                            height: '90%',
                                            margin: '5%'
                                            
                                    }}
                                    />
                                </Grid2>
                            </Grid2>
                        </AccordionSummary>
                        <AccordionDetails>{post.description}</AccordionDetails>
                        </StyledAccordion>
                    </Paper>
                ))}
                </Masonry>
                <Button color="secondary" variant="outlined" endIcon={<SendIcon />} onClick={handleClickOpen}>
                    Register
                </Button>
            </Box>
        </Box>
        </>
    )
}