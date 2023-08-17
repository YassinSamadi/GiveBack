import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import '../style/PendingCard.scss';



const PendingCard = ({ first_name, last_name,donation_title, donation_id }) => {
    const handleClickConfirm = async () => {
        
    }
    const handleClickDelete = async () => {
        

    }

    const closeClickStyle = {
        cursor: 'pointer'
    };
    
    return (
        <Card sx={{ display: 'flex', alignItems: 'center', padding: '10px', width:"670px" }}>
        <Box sx={{ display: 'inline-block', marginRight: '20px' }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Name</Typography>
            <Typography>{first_name} {last_name}</Typography>
        </Box>
        <Box sx={{ display: 'inline-block', marginRight: '20px' }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Donation title</Typography>
            <Typography>{donation_title}</Typography>
        </Box>
        <Box sx={{ display: 'inline-block', marginRight: '20px' }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Donation ID</Typography>
            <Typography>{donation_id}</Typography>
        </Box>
        <Box sx={{ display: 'inline-block', marginRight: '20px' }}>
            <Button onClick={handleClickConfirm} className='button-confirm'>
            Confirm
            </Button>
        </Box>
        <Box sx={{ display: 'inline-block', ...closeClickStyle }}>
            <CloseIcon  onClick={handleClickDelete} sx={{ fontSize: 45 , color: '#90C088'}}/>
        </Box>
        </Card>
    );
};

export default PendingCard;
