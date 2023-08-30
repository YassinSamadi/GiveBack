import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import '../../style/organization/pendingCard.scss';
import { useState } from 'react';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const PendingCardPickUp = ({ transaction_id, first_name, last_name, transaction_name, quantity, onDelete }) => {
    const [confirmationStatus, setConfirmationStatus] = useState('');


    const handleClickConfirm = async () => {
        try {
            console.log(transaction_id);
            const response = await axios.put(`/transaction/confirmPickup?id=${transaction_id}`);
            setConfirmationStatus('Transaction confirmed successfully');
            window.location.reload();
        } catch (error) {
            console.error(error);
            setConfirmationStatus('Error confirming confirmPickup');
        }
    };

    const theme = useTheme();
    const isMobile=  useMediaQuery(theme.breakpoints.up('md'));


    const closeClickStyle = {
        cursor: 'pointer'
    };
    
    return (
        <div>
            {isMobile  ? (
                <Card sx={{ display: 'flex', alignItems: 'center', padding: '10px', width:"780px" }}>
                    <Box sx={{ display: 'inline-block', marginRight: '20px', width: '150px' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Name</Typography>
                        <Typography>{first_name} {last_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'inline-block', marginRight: '20px', width: '250px' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Product Name</Typography>
                        <Typography>{transaction_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'inline-block', marginRight: '20px', width: '70px' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Transaction ID</Typography>
                        <Typography>{transaction_id}</Typography>
                    </Box>
                    <Box sx={{ display: 'inline-block', marginRight: '20px', width: '50px' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Quantity</Typography>
                        <Typography>{quantity}</Typography>
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
            ) : (
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', width: "350px" }}>
                    <Box sx={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Name</Typography>
                        <Typography>{first_name} {last_name}</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Product Name</Typography>
                        <Typography>{transaction_name}</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Transaction ID</Typography>
                        <Typography>{transaction_id}</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Quantity</Typography>
                        <Typography>{quantity}</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handleClickConfirm} className='button-confirm'>
                            Confirm
                        </Button>
                    </Box>
                    <Box sx={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', ...closeClickStyle }}>
                        <CloseIcon onClick={onDelete} sx={{ fontSize: 45, color: '#90C088' }} />
                    </Box>
                </Card>
            )}
            </div>
    );
};

export default PendingCardPickUp;
