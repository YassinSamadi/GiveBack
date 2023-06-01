import React , { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('We need water for the recent earthquake.', "Water", 6.0, "Yassin", "04/05/2023"),
    createData('We need Oil.', "Oil", 9.0, "Tom", "12/08/2023"),
    createData('We need Pasta.', "Pasta", 16.0, "Test", "28/01/2023"),
    createData('We need water for the recent earthquake.', "Water", 4, "Tim", "08/02/2023"),
    createData('We need water for the recent earthquake.', "Water", 16.0, "Yassin", "09/03/2023"),
  ];

export const ReceivedTable = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        axios
            .get('/donations')
            .then((response) => {
                setDonations(response.data);
            })
            .catch((error) => {
                console.error('Error fetching donations:', error);
            });
    }, []);

    return (
        // <div>
            // {donations.map((donation) => (
            //     <div key={donation.id}>
            //         <p>{donation.quantity_donated}</p>
            //         <p>{donation.donation_date}</p>
            //         <p>{donation.user_id}</p>
            //         <p>{donation.need_id}</p>
            //     </div>

            // )
            // )}

            <TableContainer sx={{maxWidth: 1200,}} component={Paper}>
                <Table sx={{  minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Donation(description) </TableCell>
                    <TableCell align="right">Product Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">User</TableCell>
                    <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        // </div>
    )
}

export default ReceivedTable