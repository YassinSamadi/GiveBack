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
import '../../style/organization/addNeed.scss'


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

  
  const [errors, setErrors] = useState({
    description: '',
    title: '',
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
  
    if (name === 'quantity_required') {
      const newValue = Math.min(250, Math.max(1, truncatedValue)); 
      setInputs((prev) => ({ ...prev, [name]: newValue }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: truncatedValue }));
    }
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date().toLocaleString('en-US', { timeZone: 'Europe/Brussels' });

    const adjustedTime = new Date(now);
    adjustedTime.setHours(adjustedTime.getHours() + 2);

    const formattedTime = adjustedTime.toISOString().slice(0, 19).replace('T', ' ');

    if (!inputs.title || !inputs.description || !inputs.quantity_required || !inputs.product_id) {
      setErrors({
        title: inputs.title ? '' : 'Title is required.',
        description: inputs.description ? '' : 'Description is required.',
        quantity_required: inputs.quantity_required ? '' : 'Quantity is required.',
        product_id: inputs.product_id ? '' : 'Product is required.',
      });
      return;
    }

    try {
      await axios.post('/needs/addneed', {
        title: inputs.title,
        description: inputs.description,
        quantity_required: inputs.quantity_required,
        date: formattedTime,
        product_id: inputs.product_id,
      });
      handleClose();

      window.location.reload();
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
        <DialogTitle id="NeedsPopup" className="title-add">
          Create a need 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className='container-text'>
            <div className='center-items'>
              <label
                htmlFor="title"
                className='label-title'
              >
                Title:
              </label>
              <input
                id="title"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                className='input-field-title'
              />
            </div>
            {errors.title && <div className='red-color  error-margin'>{errors.title}</div>}
          </div>

          <div  className='container-text'>
            <div className='center-items'>
              <label
                htmlFor="description"
                className='label-title'
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                rows="10"
                cols="500"
                value={inputs.description}
                onChange={handleChange}
                className='input-field-description'
              />
            </div>
            {errors.description && <div className='red-color  error-margin'>{errors.description}</div>}
          </div>

          <div className='container-product-amount '>
            <div className='center-items'>
              <label
                htmlFor="product_id"
                className='label-title'
              >
                Product:
              </label>
              <select className='select-product' id="product_id" name="product_id" value={inputs.product_id} onChange={handleChange} >
                <option value="" disabled selected hidden>Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              </div>
              {errors.product_id && <div className='red-color  error-margin'>{errors.product_id}</div>}
          </div>

            

            <div className='container-product-amount'>
              <div className='center-items'>
                <label
                  htmlFor="quantity_required"
                  className='label-title'
                >
                  Quantity:
                </label>
                <TextField
                  type="number"
                  id="quantity_required"
                  name="quantity_required"
                  inputProps={{ min: 1 , max: 250}}
                  value={inputs.quantity_required}
                  onChange={handleChange}
                  sx={{
                    width: '100%',
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#90C088',
                    },
                  }}
                />
              </div>
                {errors.quantity_required && <div className='red-color  error-margin'>{errors.quantity_required}</div>}
            </div>

            <div className='title-add'>
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
            sx={{ color: '#90C088' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
