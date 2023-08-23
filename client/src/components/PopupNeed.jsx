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
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

function getStyles(name, selectedName, theme) {
  return {
    fontWeight:
      selectedName === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


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
        <DialogTitle id="NeedsPopup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
          Create a need 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label
                htmlFor="title"
                style={{  marginRight: '10px', minWidth: '100px' }}
              >
                Title:
              </label>
              <input
                id="title"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                style={{ border: '1px solid lightgrey', flex: 1, fontSize:'17px', height:'40px'  }}
              />
            </div>
            {errors.title && <div style={{ color: 'red', marginLeft: '110px' }}>{errors.title}</div>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label
                htmlFor="description"
                style={{  marginRight: '10px', minWidth: '100px' }}
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
                style={{ border: '1px solid lightgrey',  fontSize:'17px' }}
              />
            </div>
            {errors.description && <div style={{ color: 'red', marginLeft: '110px' }}>{errors.description}</div>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label
                htmlFor="product_id"
                style={{  marginRight: '10px', minWidth: '100px' }}
              >
                Product:
              </label>
              <select id="product_id" name="product_id" value={inputs.product_id} onChange={handleChange} style={{ border: '1px solid lightgrey', flex: 1, fontSize:'17px', height:'40px' }}>
                <option value="" disabled selected hidden>Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              
            </div>

            

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label
                htmlFor="quantity_required"
                style={{  marginRight: '10px', minWidth: '100px' }}
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
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#90C088',
                  },
                }}
              />
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
