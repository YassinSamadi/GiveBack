import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function NeedsPopup() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log('Form submitted!');
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ backgroundColor:  '#90C088', color:'white', borderColor: 'white' }}           
      >
        Create need
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="NeedsPopup"
      >
        <DialogTitle id="NeedsPopup" style={{color: '#90C088', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
          Create a need 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label
                htmlFor="description"
                style={{ color: '#90C088', marginRight: '10px', minWidth: '100px' }}
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                style={{ border: '1px solid #90C088', flex: 1 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label
                htmlFor="quantity"
                style={{ color: '#90C088', marginRight: '10px', minWidth: '100px' }}
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                style={{ border: '1px solid #90C088', flex: 1 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label
                htmlFor="product"
                style={{ color: '#90C088', marginRight: '10px', minWidth: '100px' }}
              >
                Product:
              </label>
              <select
                id="product"
                name="product"
                style={{ border: '1px solid #90C088', flex: 1 }}
              >
                <option value="product1">Product 1</option>
                <option value="product2">Product 2</option>
                <option value="product3">Product 3</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                style={{ backgroundColor:  '#90C088', color:'white', borderColor: 'white' }}              >
                Submit
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            style={{ color: '#90C088' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
