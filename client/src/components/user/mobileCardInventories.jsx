import React from 'react';
import { Card, Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';
import '../../style/organization/pendingCard.scss';
import StyledButton from '../ui/StyledButton';

const CardInventories = ({ product_name, quantity, handleClickConfirm, handleChange,value, image }) => {
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
                        <img className='img-accordion-user ' alt="user_image" src={image} />
                        
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
                        <StyledButton onClick={handleClickConfirm} text={'Request'} />
                    </Box>
                </Card>
    );
};

export default CardInventories;
