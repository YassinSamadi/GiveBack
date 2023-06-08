import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogContentText } from '@mui/material';
import axios from 'axios';

const EditNeed = ({ open, handleClose, need, products }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState(need || {});

    useEffect(() => {
        setFormData(need || {});
    }, [need]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProductChange = (e) => {
        setFormData({ ...formData, product_id: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put('/needs/updateNeed', formData);
            console.log('Need updated successfully');
            handleClose();
        } catch (error) {
            console.error('Error updating need:', error);
        }
    };

    if (!need || !products) return null;

    return (
        <Dialog maxWidth={'lg'} fullScreen={fullScreen} open={open} onClose={handleClose} >
            <DialogTitle>Edit Need</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p>{formData.id}</p>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="quantity_required"
                        value={formData.quantity_required || ''}
                        onChange={handleChange}
                    />
                    <select 
                        name="product_id"
                        value={formData.product_id || ''}
                        onChange={handleProductChange}
                    >
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                </DialogContentText>
                <Button
                    variant="outlined"
                    style={{ backgroundColor:  '#90C088', color:'white', borderColor: 'white' }}
                    onClick={handleSubmit}  
                >
                    Update Need
                </Button>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditNeed;

