import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogContentText } from '@mui/material';

const CardDetails = ({ open, handleClose, product }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    if (!product) return null;

    const imgSrc = product && product.picture ? `../${product.picture}` : '../default_picture_path';

    return (
        <Dialog maxWidth={'lg'} fullScreen={fullScreen} open={open} onClose={handleClose} >
            <DialogTitle>{product.name}</DialogTitle>
            <DialogContent>
                <img
                    style={{
                        display: "block",
                        margin: "auto",
                        height: isMobile ? "250px" : "300px",
                        width: isMobile ? "300px" : "400px"
                    }}
                    src={imgSrc}
                    alt={product.name}
                />                
                <DialogContentText>
                    <p>{product.description}</p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CardDetails;
