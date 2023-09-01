import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const DeletePopup = ({ open, handleClose, handleDelete, title, content }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete {title}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this {content}?
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

export default DeletePopup;
