import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';

const DeleteDonation = ({ open, handleClose, donation }) => {
    const handleDelete = () => {
        axios
            .delete(`/donations/deleteDonation?id=${donation.id}`)
            .then(response => {
                handleClose();
            })
            .catch(err => console.error('Error deleting need:', err));
    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Delete Donation</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this donation?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} color="primary" variant="contained" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDonation;
