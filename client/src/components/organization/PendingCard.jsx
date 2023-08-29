import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, NoSsr } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import '../../style/organization/pendingCard.scss';
import { useState } from 'react';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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

    const theme = useTheme();
    const isMobile=  useMediaQuery(theme.breakpoints.up('md'));


    const closeClickStyle = {
        cursor: 'pointer'
    };

    const boxStyle = {
        display: 'inline-block', marginRight: '20px',
    }
    const boxMobileStyle ={
        marginBottom: '10px',
        width: '100%', 
        textAlign: 'center'
    }
    const bold = {
        fontWeight: 'bold'
    }
    const cardStyle = {
        display: 'flex', 
        alignItems: 'center', 
        padding: '10px',
    }
    
    return (
        <div>
            {isMobile  ? (
                <Card sx={{ width:"780px", ...cardStyle }}>
                    <Box sx={{ width: '150px', ...boxStyle }}>
                        <Typography sx={bold} variant="subtitle1">Name</Typography>
                        <Typography>{first_name} {last_name}</Typography>
                    </Box>
                    <Box sx={{  width: '250px', ...boxStyle }}>
                        <Typography sx={bold} variant="subtitle1">Need title</Typography>
                        <Typography>{donation_title}</Typography>
                    </Box>
                    <Box sx={{ width: '70px', ...boxStyle}}>
                        <Typography sx={bold} variant="subtitle1">Need ID</Typography>
                        <Typography>{need_id}</Typography>
                    </Box>
                    <Box sx={{ width: '50px', ...boxStyle}}>
                        <Typography sx={bold} variant="subtitle1">Amount</Typography>
                        <Typography>{amount}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: '20px',  ...boxStyle}}>
                        <Button onClick={handleClickConfirm} className='button-confirm'>
                        Confirm
                        </Button>
                        
                    </Box>
                    <Box sx={{ display: 'inline-block', ...closeClickStyle }}>
                        <CloseIcon  onClick={onDelete} sx={{ fontSize: 45 , color: '#90C088'}}/>
                    </Box>
                </Card>
            ) : (
                <Card sx={{ flexDirection: 'column', width: "350px", ...cardStyle }}>
                    <Box sx={boxMobileStyle}>
                        <Typography sx={bold} variant="subtitle1">Name</Typography>
                        <Typography>{first_name} {last_name}</Typography>
                    </Box>
                    <Box sx={boxMobileStyle}>
                        <Typography sx={bold} variant="subtitle1">Need title</Typography>
                        <Typography>{donation_title}</Typography>
                    </Box>
                    <Box sx={boxMobileStyle}>
                        <Typography sx={bold} variant="subtitle1">Need ID</Typography>
                        <Typography>{need_id}</Typography>
                    </Box>
                    <Box sx={ boxMobileStyle }>
                        <Typography sx={bold} variant="subtitle1">Amount</Typography>
                        <Typography>{amount}</Typography>
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

export default PendingCard;