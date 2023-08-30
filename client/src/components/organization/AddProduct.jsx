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
import { TextField } from '@mui/material';
import '../../style/organization/addProduct.scss'


export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState([]);
  const [inputs, setInputs] = useState({
    quantity: '',
    product_id: '',
  });

  
  const [errors, setErrors] = useState({
    quantity: '',
    product_id: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';
    
    if (name === 'description' && value.length > 400) {
      errorMessage = 'Description should not exceed 400 characters.';
    } else if (name === 'title' && value.length > 45) {
      errorMessage = 'Title should not exceed 45 characters.';
    }
    
    const truncatedValue = value.slice(0, name === 'description' ? 400 : 45);
  
    if (name === 'quantity') {
      const newValue = Math.min(250, Math.max(1, truncatedValue)); 
      setInputs((prev) => ({ ...prev, [name]: newValue }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: truncatedValue }));
    }
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.product_id || !inputs.quantity) {
      setErrors({
        product_id: inputs.product_id ? '' : 'Product is required.',
        quantity: inputs.quantity ? '' : 'Quantity is required.',
      });
      return;
    }

    try {
      await axios.post('/inventory/addproduct', {
        quantity: inputs.quantity,
        product_id: inputs.product_id,
      });
      handleClose();

      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error);
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
    <div className='container-product'>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ backgroundColor:  '#90C088', color:'white', borderColor: 'white', marginTop: '15px' }}           
      >
        Add product
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="NeedsPopup"
      >
        <DialogTitle id="NeedsPopup" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
          Add product 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>

            <div className='dialog-item-quantity-add'>
              <div className='center-items'>
                <label htmlFor="product_id" className='label-titles'>
                  Product:
                </label>
                <select id="product_id" name="product_id" value={inputs.product_id} onChange={handleChange} className='product-select'>
                  <option value="" disabled selected hidden>Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
              {errors.product_id && <div className='error-message error-margin3'>{errors.product_id}</div>}
            </div>

            <div className='dialog-item-quantity-add'>
              <div className='center-items'>
                <label htmlFor="quantity" className='label-titles'>
                  Quantity:
                </label>
                <TextField
                  type="number"
                  id="quantity"
                  name="quantity"
                  inputProps={{ min: 1, max: 250 }}
                  value={inputs.quantity}
                  onChange={handleChange}
                  sx={{
                    width: '100%',
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#90C088',
                    },
                  }}
                />
              </div>
              {errors.quantity && <div className='error-message error-margin3'>{errors.quantity}</div>}
            </div>

            <div className='dialog-items'>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                sx={{ backgroundColor:  '#90C088', color:'white', borderColor: 'white' }}              
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
            sx={{ color: '#90C088' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
