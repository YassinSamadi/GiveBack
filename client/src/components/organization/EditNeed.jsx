import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import DialogContentText from '@mui/material/DialogContentText';

const EditNeed = ({ open, handleClose, need, products }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({});
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    setFormData(need || {});
  }, [need]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let truncatedValue = value;

    if (name === 'title' && value.length > 45) {
      truncatedValue = value.slice(0, 45);
      setTitleError('Title should not exceed 45 characters.');
    } else {
      setTitleError('');
    }

    if (name === 'description' && value.length > 400) {
      truncatedValue = value.slice(0, 400);
      setDescriptionError('Description should not exceed 400 characters.');
    } else {
      setDescriptionError('');
    }

    if (name === 'quantity_required') {
      const newValue = Math.min(250, Math.max(1, value));
      truncatedValue = newValue;
    }

    setFormData({ ...formData, [name]: truncatedValue });
  };

  const handleProductChange = (e) => {
    setFormData({ ...formData, product_id: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put('/needs/updateNeed', formData);
      handleClose();
    } catch (error) {
      console.error('Error updating need:', error);
    }
  };

  if (!need || !products) return null;

  return (
    <Dialog maxWidth={'lg'} fullScreen={fullScreen} open={open} onClose={handleClose}>
      <DialogTitle>Edit Need</DialogTitle>
      <DialogContent>
      <DialogContentText>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label htmlFor="title" style={{ minWidth: '150px', marginRight: '10px' }}>Title:</label>
    <input
      type="text"
      name="title"
      value={formData.title || ''}
      onChange={handleChange}
      style={{ border: '1px solid lightgrey', fontSize: '17px', height: '40px', flex: 2 }}
    />
  </div>
  {titleError && <span style={{ color: 'red' }}>{titleError}</span>}
</div>

<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label htmlFor="description" style={{ minWidth: '150px', marginRight: '10px' }}>Description:</label>
    <textarea
      name="description"
      value={formData.description || ''}
      onChange={handleChange}
      rows="10"
      cols="40"
      style={{ border: '1px solid lightgrey', fontSize: '17px', minHeight: '100px', flex: 2 }}
    />
  </div>
  {descriptionError && <span style={{ color: 'red' }}>{descriptionError}</span>}
</div>

<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
  <label htmlFor="product_id" style={{ minWidth: '150px', marginRight: '10px' }}>Product:</label>
  <Select
    name="product_id"
    value={formData.product_id || ''}
    onChange={handleProductChange}
    style={{ flex: 2 }}
  >
    {products.map((product) => (
      <MenuItem key={product.id} value={product.id}>
        {product.name}
      </MenuItem>
    ))}
  </Select>
</div>

<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
  <label htmlFor="quantity_required" style={{ minWidth: '150px', marginRight: '10px' }}>Amount Required:</label>
  <TextField
    type="number"
    name="quantity_required"
    value={formData.quantity_required || ''}
    onChange={handleChange}
    inputProps={{ min: 1, max: 250 }}
    style={{ flex: 2 }}
  />
</div>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                <Button
                variant="outlined"
                style={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white', marginTop: '20px' }}
                onClick={handleSubmit}
                >
                Update Need
                </Button>
            </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNeed;
