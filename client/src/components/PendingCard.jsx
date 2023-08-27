import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import '../style/PendingCard.scss';
import { useState } from 'react';
import axios from 'axios';

const PendingCard = ({ first_name, last_name,donation_title, donation_id,amount,onDelete, need_id  }) => {
    const [confirmationStatus, setConfirmationStatus] = useState('');


    const handleClickConfirm = async () => {
        try {
            const response = await axios.put(`/donations/confirmDonation?id=${donation_id}`);
            setConfirmationStatus('Donation confirmed successfully');
        } catch (error) {
            console.error(error);
            setConfirmationStatus('Error confirming donation');
        }
    };
    



    const closeClickStyle = {
        cursor: 'pointer'
    };
    
    return (
        <Card sx={{ display: 'flex', alignItems: 'center', padding: '10px', width:"780px" }}>
            <Box sx={{ display: 'inline-block', marginRight: '20px', width: '150px' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Name</Typography>
                <Typography>{first_name} {last_name}</Typography>
            </Box>
            <Box sx={{ display: 'inline-block', marginRight: '20px', width: '250px' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Need title</Typography>
                <Typography>{donation_title}</Typography>
            </Box>
            <Box sx={{ display: 'inline-block', marginRight: '20px', width: '70px' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Need ID</Typography>
                <Typography>{need_id}</Typography>
            </Box>
            <Box sx={{ display: 'inline-block', marginRight: '20px', width: '50px' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Amount</Typography>
                <Typography>{amount}</Typography>
            </Box>
            <Box sx={{ display: 'inline-block', marginRight: '20px', marginLeft: '20px' }}>
                <Button onClick={handleClickConfirm} className='button-confirm'>
                Confirm
                </Button>
                
            </Box>
            <Box sx={{ display: 'inline-block', ...closeClickStyle }}>
                <CloseIcon  onClick={onDelete} sx={{ fontSize: 45 , color: '#90C088'}}/>
            </Box>
        </Card>
    );
};

export default PendingCard;
