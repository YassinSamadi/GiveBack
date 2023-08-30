import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import '../../style/organization/inventoryTable.scss';
import { createTheme } from '@mui/material/styles';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


const theme = createTheme();


export const InventoryTable = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        quantity: 0,
    });

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {

        axios
            .get(`/inventory/getinventory`)
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

    const handleChange = (e) => {
        const value = e.target.value;

        setFormData({ ...formData, quantity: value });
    };

    const handleAddSubmit = async (productId) => {
        try {
            await axios.put(`/inventory/addtoinventory?id=${productId}`, formData);
            const updatedProducts = products.map((product) => {
                return { ...product, quantity: product.id === productId ? +product.quantity + +formData.quantity : product.quantity };
            });
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating inventory:', error);
        } finally {
            handleClose();
        }
    };

    const handleRemoveSubmit = async (productId) => {
        try {
            await axios.put(`/inventory/removefrominventory?id=${productId}`, formData);
            const updatedProducts = products.map((product) => {
                return { ...product, quantity: product.id === productId ? (+product.quantity - +formData.quantity >= 0 ? +product.quantity - +formData.quantity : 0) : product.quantity };
            });
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating inventory:', error);
        } finally {
            handleClose();
        }
    }

    return (
        <TableContainer sx={{ maxWidth: 1200 }} component={Paper}>
            <Table sx={{ minWidth: isMobile ? 250 : 650 }} aria-label="inventory table">
                <TableHead>
                    <TableRow>
                        {isMobile ? null : <TableCell></TableCell>}
                        <TableCell align="right">Product name</TableCell>
                        {isMobile ? null : <TableCell align="right">Product id</TableCell>}
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right" colSpan={2}>Actions</TableCell>
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
                                {isMobile ? null : <TableCell align="right"><img className='img ' src={product.product_picture} /></TableCell>}
                                <TableCell align="right">{product.product_name}</TableCell>
                                {isMobile ? null : <TableCell align="right">{product.product_id}</TableCell>}
                                <TableCell align="right" >{product.quantity}</TableCell>
                                <TableCell align="right">
                                    <TextField className="quantity-input" onChange={handleChange} type="number" />
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" sx={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white', marginTop: '15px' }} onClick={() => handleAddSubmit(product.id)} disableRipple>
                                        <AddIcon />
                                        Add
                                    </Button>
                                    <Button variant="outlined" sx={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white', marginTop: '15px' }} onClick={() => handleRemoveSubmit(product.id)} disableRipple>
                                        <RemoveIcon />
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InventoryTable;
