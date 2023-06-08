import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';

const DeleteNeed = ({ open, handleClose, need }) => {
    const handleDelete = () => {
        axios
            .delete(`/needs/deleteNeed?id=${need.id}`)
            .then(response => {
                console.log(response.data);
                handleClose();
            })
            .catch(err => console.error('Error deleting need:', err));
    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Delete Need</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this need?
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

export default DeleteNeed;
