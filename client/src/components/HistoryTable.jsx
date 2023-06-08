import React , { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export const HistoryTable = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        // Get user information from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;

        if(userId) {
            axios
                .get(`/donations/getAllDonationsByUser?user_id=${userId}`)
                .then((response) => {
                    setDonations(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching donations:', error);
                });
        } else {
            console.error('No user found in local storage.');
        }
    }, []);
    

    return (
        <TableContainer sx={{maxWidth: 1200,}} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Donation (Title) </TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Organization</TableCell>
                <TableCell align="right">Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {donations.map((donation) => (
                <TableRow
                    key={donation.donation_date}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {donation.title}
                    </TableCell>
                    <TableCell align="left">{donation.product}</TableCell>
                    <TableCell align="right">{donation.quantity_donated}</TableCell>
                    <TableCell align="right">{donation.organization}</TableCell>
                    <TableCell align="right">{donation.donation_date}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default HistoryTable;
