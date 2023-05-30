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
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export const HistoryTable = () => {
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
        //     {donations.map((donation) => (
        //         <div key={donation.id}>
        //             <p>{donation.quantity_donated}</p>
        //             <p>{donation.donation_date}</p>
        //             <p>{donation.user_id}</p>
        //             <p>{donation.need_id}</p>
        //         </div>

        //     )
        //     )}

            <TableContainer sx={{maxWidth: 1200,}} component={Paper}>
                <Table sx={{  minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Donation(description) </TableCell>
                    <TableCell align="right">Product Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Organization</TableCell>
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

export default HistoryTable