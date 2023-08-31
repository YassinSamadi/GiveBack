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
    
    return (
        <Button >
                
        </Button>
    );
};

export default CardInventories;
