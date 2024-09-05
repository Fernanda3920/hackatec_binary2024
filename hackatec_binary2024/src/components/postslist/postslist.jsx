import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import './postslist.css'

const heights = [150, 230, 190, 170, 210, 150, 230, 180, 150, 190, 200, 150, 230, 150, 180];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    color: theme.palette.text.secondary,
    backgroundColor: '#1A202722',
}));

export default function postlist(){
    document.title = 'Horizon360 - Looking for adventure?';
    return (
        
        <Box class='frosted box'>
            <Box class='box'>
                <Button color="secondary" variant="outlined" endIcon={<SendIcon />} onClick={handleClickOpen}>
                    Register
                </Button>
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
            </Box>
            
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                {"Welcome"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Haz iniciado sesión correctamente.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}