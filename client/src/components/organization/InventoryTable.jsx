import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { createTheme } from '@mui/material/styles';

import '../../style/organization/inventoryTable.scss';
import StyledButton from '../ui/StyledButton';
import ReversedButton from '../ui/ReversedButton';

const theme = createTheme();

const InventoryTable = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    quantity: 0,
  });
  const [adjustedQuantity, setAdjustedQuantity] = useState(0);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get('/inventory/getinventory')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);
    value = Math.min(Math.max(value, 1), 250);
    e.target.value = value;
    setAdjustedQuantity(value);
  };

  const handleAddSubmit = async (productId) => {
    try {
      await axios.put(`/inventory/addtoinventory?id=${productId}`, {
        quantity: adjustedQuantity,
      });
      const updatedProducts = products.map((product) => ({
        ...product,
        quantity:
          product.id === productId
            ? +product.quantity + +adjustedQuantity
            : product.quantity,
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating inventory:', error);
    } finally {
      handleClose();
    }
  };

  const handleRemoveSubmit = async (productId) => {
    try {
      await axios.put(`/inventory/removefrominventory?id=${productId}`, {
        quantity: adjustedQuantity,
      });
      const updatedProducts = products.map((product) => ({
        ...product,
        quantity:
          product.id === productId
            ? Math.max(+product.quantity - +adjustedQuantity, 0)
            : product.quantity,
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating inventory:', error);
    } finally {
      handleClose();
    }
  };

  return (
    <TableContainer sx={{ maxWidth: 1200 }} component={Paper}>
      <Table sx={{ minWidth: isMobile ? 250 : 650 }} aria-label="inventory table">
        <TableHead>
          <TableRow>
            {isMobile ? null : <TableCell></TableCell>}
            <TableCell align="right">Product name</TableCell>
            {isMobile ? null : <TableCell align="right">Product id</TableCell>}
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right" colSpan={2}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No inventory to display.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {isMobile ? null : <TableCell align="right"><img className="img" src={product.product_picture} /></TableCell>}
                <TableCell align="right">{product.product_name}</TableCell>
                {isMobile ? null : <TableCell align="right">{product.product_id}</TableCell>}
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">
                  <TextField inputProps={{ min: 1 }} className="quantity-input" onChange={handleInputChange} type="number" />
                </TableCell>
                <TableCell align="right">
                  <StyledButton sx={{ width: '70px' }} text="Add" icon={<AddIcon />} onClick={() => handleAddSubmit(product.id)} />
                  <ReversedButton text="Remove" icon={<RemoveIcon />} onClick={() => handleRemoveSubmit(product.id)} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
