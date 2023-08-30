import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import '../../style/user/inventoriesTable.scss';
import defaultProfilePic from '../../assets/miscellaneous/profile-pic.jpg';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha, createTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { create } from '@mui/material/styles/createTransitions';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: 'auto',
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    border: '1px solid lightgrey',
    borderRadius: theme.shape.borderRadius *4,
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 640,
      },
    },
    '& .Mui-focused': {
      borderColor: 'lightgrey',
    },
  }));

export const InventoryTable = () => {
    const [organizations, setOrganizations] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [formData, setFormData] = useState({
        quantity: 0,
        inventoryId: 0,
    });
    const theme = createTheme();    

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        axios
            .get(`/organization/getOrganizationsInventory`)
            .then((response) => {
                setOrganizations(response.data);
            })
            .catch((error) => {
                console.error('Error fetching organizations:', error);
            });

        axios
            .get(`/inventory/getinventories`)
            .then((response) => {
                setInventories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching inventories:', error);
            });
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        setFormData({ ...formData, quantity: value });
    };

    const handleClick = async (inventoryId) => {
        try {
           formData.inventoryId = inventoryId;
            await axios.post(`/transaction/addTransaction`, formData);
            await axios.put(`/inventory/removeFromInventory?id=${inventoryId}`, formData);
            const updatedProducts = inventories.map((product) => {
                return { ...product, quantity: product.id === inventoryId ? (+product.quantity - +formData.quantity >= 0 ? +product.quantity - +formData.quantity : 0) : product.quantity };
            });
            setInventories(updatedProducts);
        } catch (error) {
            console.error('Error requesting product:', error);
        }
    };

    return (
        <div className='container-accordion'>
            
            <div className='center-div'>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search by product? organization?"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </div>
            {organizations.map((organization) => (
                <Accordion key={organization.id} sx={{width: isMobile ? 340 : 1000}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <img className='img-accordion-user ' src={organization.logo ? `/assets/uploads/logo/${organization.logo}`: defaultProfilePic} />
                        <Typography sx={{ alignSelf: "center", marginLeft: isMobile ? "10px" : '50px' }} variant={isMobile ? "h6" : "h4"}>{organization.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer sx={{ maxWidth: 1200, }} component={Paper}>
                            <Table sx={{ width: isMobile ? 300 : 950 }} aria-label="inventory table">
                                <TableHead>
                                    <TableRow>
                                        {isMobile ? null : ( <TableCell></TableCell>)}
                                        <TableCell align="right">Product name</TableCell>
                                        <TableCell align="right">Quantity Available</TableCell>
                                        <TableCell align="right" colSpan={2}>Request</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{
                                    inventories.map((inventory) => (
                                        (inventory.org_id == organization.id) ? (
                                            <TableRow key={inventory.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                {isMobile ? null : (
                                                    <TableCell align="right">
                                                        <img className='img-product-table' src={inventory.product_picture} />
                                                    </TableCell>
                                                )}
                                                <TableCell align="right">{inventory.product_name}</TableCell>
                                                <TableCell align="right">{inventory.quantity}</TableCell>
                                                <TableCell align="right">
                                                    <TextField className="quantity-input" onChange={handleChange} type="number" />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        className='actions' onClick={() => handleClick(inventory.id)} disableRipple
                                                    >
                                                        Request
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ) : null
                                    ))
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default InventoryTable;
