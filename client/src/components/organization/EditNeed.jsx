import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import '../../style/organization/editNeed.scss';

const EditNeed = ({ open, handleClose, need, products, onEditSuccess }) => {
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
      if (!formData.title || !formData.description || !formData.quantity_required || !formData.product_id) {
        setTitleError(formData.title ? '' : 'Title is required.');
        setDescriptionError(formData.description ? '' : 'Description is required.');
        return;
      }
      
      await axios.put('/needs/updateNeed', formData);
      onEditSuccess(formData);
      handleClose();
    } catch (error) {
      console.error('Error updating need:', error);
    }
  };

  if (!need || !products) return null;

  return (
    <Dialog maxWidth={'lg'} fullScreen={fullScreen} open={open} onClose={handleClose}>
      <DialogTitle className='title-edit'>Edit Need</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className='container-text'>
            <div className='center-items'>
              <label htmlFor="title" className='label-edit'>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className='input-field-title'
              />
            </div>
            {titleError && <span className='error-margin2 red-color'>{titleError}</span>}
          </div>

          <div className='container-text'>
            <div className='center-items'>
              <label htmlFor="description" className='label-edit'>Description:</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows="10"
                cols="40"
                className='input-field-description'
              />
            </div>
            {descriptionError && <span className='error-margin2 red-color'>{descriptionError}</span>}
          </div>

          <div className='container-product-amount'>
            <div className='center-items'>
              <label htmlFor="product_id" className='label-edit'>Product:</label>
              <Select
                name="product_id"
                value={formData.product_id || ''}
                onChange={handleProductChange}
                className='flex-2'
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div className='container-product-amount'>
            <div className='center-items'>
              <label htmlFor="quantity_required" className='label-edit'>Amount Required:</label>
              <TextField
                type="number"
                name="quantity_required"
                value={formData.quantity_required || ''}
                onChange={handleChange}
                inputProps={{ min: 1, max: 250 }}
                className='flex-2'
              />
            </div>
          </div>

          <div className='title-edit'>
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
        <Button autoFocus onClick={handleClose} sx={{ color: '#90C088' }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNeed;
