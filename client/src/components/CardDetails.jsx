import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogContentText } from '@mui/material';
import axios from 'axios';

const CardDetails = ({ open, handleClose, product }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [quantityDonated, setQuantityDonated] = useState(0);
    if (!product) return null;

    const imgSrc = product && product.picture ? `../${product.picture}` : '../default_picture_path';
    const maxValue = product.quantity_required - product.quantity_fulfilled;

    const handleSubmit = async () => {
        const donation_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user ? user.id : null;
        const need_id = product.id;
        try {
            await axios.post('/donations/userDonation', {
                quantity_donated: quantityDonated,
                donation_date,
                user_id,
                need_id
            });
            console.log('Donation made successfully');
            handleClose();
        } catch (error) {
            console.error('Error making donation:', error);
        }
    };

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
                <DialogContentText>
                    <p >{product.organization_name}</p>
                </DialogContentText>
                <DialogContentText>
                    <p >{product.organization_city}</p>
                </DialogContentText>
                <DialogContentText>
                    <p >{product.quantity_fulfilled}</p>
                </DialogContentText>
                <DialogContentText>
                    <p >{product.quantity_required}</p>
                </DialogContentText>
                <input
                    type="number"
                    id="quantity_donated"
                    name="quantity_donated"
                    min="1"
                    max={maxValue}
                    value={quantityDonated}
                    onChange={e => setQuantityDonated(e.target.value)}
                    style={{ border: '1px solid #90C088', flex: 1 }}
                />
                <Button
                    variant="outlined"
                    style={{ backgroundColor:  '#90C088', color:'white', borderColor: 'white' }}
                    onClick={handleSubmit}  
                >
                    submit donation
                </Button>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CardDetails;
