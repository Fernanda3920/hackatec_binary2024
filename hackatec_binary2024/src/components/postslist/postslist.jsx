import { Box, Typography, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React from "react";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
                <Masonry columns={3} spacing={5} sequential >
                {heights.map((height, index) => (
                    <Paper key={index} class="paper">
                        <StyledAccordion sx={{ minHeight: height, backgroundColor:'#1A202722' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Entrada {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>Precio: {index%20+5 * height}</AccordionDetails>
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