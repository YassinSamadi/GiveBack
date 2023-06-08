import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

export default function NeedsPopup() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState([]);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    quantity_required: '',
    product_id: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date().toLocaleString('en-US', { timeZone: 'Europe/Brussels' });

    const adjustedTime = new Date(now);
    adjustedTime.setHours(adjustedTime.getHours() + 2);

    const formattedTime = adjustedTime.toISOString().slice(0, 19).replace('T', ' ');


    const organization = JSON.parse(localStorage.getItem('organization'));
    const org_id = organization && typeof organization === 'object' ? organization.id : null;

    if (org_id === null) {
      // Handle the case where org_id is null
      console.error('Invalid organization data');
      return;
    }

    try {
      await axios.post('/needs/addneed', {
        title: inputs.title,
        description: inputs.description,
        quantity_required: inputs.quantity_required,
        date: formattedTime,
        org_id: org_id,
        product_id: inputs.product_id,
      });
      console.log('Need created successfully');
      handleClose();
    } catch (error) {
      console.error('Error creating need:', error);
    }
  };

  useEffect(() => {
    axios
      .get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

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
                htmlFor="title"
                style={{ color: '#90C088', marginRight: '10px', minWidth: '100px' }}
              >
                Title:
              </label>
              <input
                id="title"
                name="title"
                
                value={inputs.title}
                onChange={handleChange}
                style={{ border: '1px solid #90C088', flex: 1 }}
              />
            </div>

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
                value={inputs.description}
                onChange={handleChange}
                style={{ border: '1px solid #90C088', flex: 1 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label
                htmlFor="quantity_required"
                style={{ color: '#90C088', marginRight: '10px', minWidth: '100px' }}
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity_required"
                name="quantity_required"
                min="1"
                value={inputs.quantity_required}
                onChange={handleChange}
                style={{ border: '1px solid #90C088', flex: 1 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label
                htmlFor="product_id"
                style={{ color: '#90C088', marginRight: '10px', minWidth: '100px' }}
              >
                Product:
              </label>
              <select id="product_id" name="product_id" value={inputs.product_id} onChange={handleChange} style={{ border: '1px solid #90C088', flex: 1 }}>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                style={{ backgroundColor:  '#90C088', color:'white', borderColor: 'white' }}              
              >
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
