import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import StyledButton from '../ui/StyledButton';

const DeletePopup = ({ open, handleClose, handleDelete, title, content }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete {title}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this {content}?
      </DialogContent>
      <DialogActions>
        <Button sx={{color:'#90C088' }} onClick={handleClose}>Cancel</Button>
        <StyledButton text={'Delete'} onClick={handleDelete} color="primary" variant="contained" autoFocus/>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
