import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, NoSsr, TextField } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import '../../style/organization/pendingCard.scss';
import { useState } from 'react';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const CardInventories = ({ product_name, quantity, handleClickConfirm, handleChange,value, image }) => {

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
        <Card sx={{ flexDirection: 'column', width: "300px", ...cardStyle }}>
                    <Box sx={boxMobileStyle}>
                        <img className='img-accordion-user ' src={image} />
                        
                    </Box>
                    <Box sx={boxMobileStyle}>
                        <Typography sx={bold} variant="subtitle1">Product name</Typography>
                        <Typography>{product_name}</Typography>
                    </Box>
                    <Box sx={boxMobileStyle}>
                        <Typography sx={bold} variant="subtitle1">Quantity Available</Typography>
                        <Typography>{quantity}</Typography>
                    </Box>
                    <Box sx={boxMobileStyle}>
                        <Typography sx={bold} variant="subtitle1">Request</Typography>
                    </Box>
                    <Box sx={ boxMobileStyle }>
                        <TextField className="quantity-input" onChange={handleChange} type="number" value={value} />
                    </Box>
                    <Box sx={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handleClickConfirm} className='button-confirm'>
                            Request
                        </Button>
                    </Box>
                </Card>
    );
};

export default CardInventories;
