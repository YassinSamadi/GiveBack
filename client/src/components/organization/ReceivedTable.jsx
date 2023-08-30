import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import dayjs from 'dayjs';
export const ReceivedTable = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
            axios
                .get(`/donations/getDonationsToOrganization`)
                .then((response) => {
                    setDonations(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching donations:', error);
                });
    }, []);

    return (
        <TableContainer sx={{maxWidth: 1200,}} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Donation (Title) </TableCell>
                        <TableCell align="right">Product Name</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">User</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {donations.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                No donations to display.
                            </TableCell>
                        </TableRow> 
                    ) : (
                        donations.map((donation) => (
                        <TableRow
                            key={donation.donation_date}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {donation.title}
                            </TableCell>
                            <TableCell align="right">{donation.product_name}</TableCell>
                            <TableCell align="right">{donation.quantity_donated}</TableCell>
                            <TableCell align="right">{donation.user_name}</TableCell>
                            <TableCell align="right">{dayjs(donation.donation_date).format('DD/MM/YYYY')}</TableCell>
                        </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ReceivedTable;
