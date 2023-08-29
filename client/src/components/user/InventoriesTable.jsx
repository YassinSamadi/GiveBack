import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import '../../style/InventoryTable.scss';

export const InventoryTable = () => {
    const [organizations, setOrganizations] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [formData, setFormData] = useState({
        quantity: 0,
    });

    useEffect(() => {
        axios
            .get(`/organization`)
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

    const handleClick = async (event) => {
        const productId = event.currentTarget.getAttribute("id")
        try {
            /* 
            Make a new controller route to be able to request a product from an inventory of an organization
            Find out how to do it best (temporary amount column added or not show anything to the user and make a hand check mechanism)
            */
            await axios.put(`/inventory/addtoinventory?id=`, formData);
        } catch (error) {
            console.error('Error requesting product:', error);
        }
    };

    return (
        organizations.map((organization) => (
            <Accordion key={organization.id} sx={{ maxWidth: 1200, minWidth: 1100 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                >
                    <img className='img-accordion' src={`/assets/uploads/logo/${organization.logo}`} />
                    <Typography variant="h4">{organization.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer sx={{ maxWidth: 1200, }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="inventory table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="right">Product name</TableCell>
                                    <TableCell align="right">Quantity Available</TableCell>
                                    <TableCell align="right" colSpan={2}>Request</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{
                                inventories.map((inventory) => (
                                    (inventory.org_id == organization.id) ? (
                                        <TableRow key={inventory.product_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="right"><img className='img' src={inventory.product_picture} /></TableCell>
                                            <TableCell align="right">{inventory.product_name}</TableCell>
                                            <TableCell align="right">{inventory.quantity}</TableCell>
                                            <TableCell align="right">
                                                <TextField className="quantity-input" onChange={handleChange} type="number" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    className='actions'
                                                    id={inventory.product_id} onClick={handleClick} disableRipple
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
        ))
    );
}

export default InventoryTable;
