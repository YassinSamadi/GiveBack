import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const CardNeedUser = ({ imageSrc, title, description, date, fulfilled, required, onClick, nameOrganization, city }) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#90C088", 
            },
            secondary: {
                main: "#D9D9D9", 
            },
        },
    });

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '15px',
        maxWidth: 350,
        minWidth: 280,
        height: 284,
        margin: '0 auto',
        
        position: 'relative', 
    };

    const imageStyle = {
        width: '100%',
        height: 155,
        objectFit: 'cover',
        filter: 'brightness(70%)'
    };

    const titleStyle = {
        position: 'absolute',
        top: '120px', 
        left: '0px',
        right: '0px',
        padding: '4px 16px', 
        borderRadius: '4px',
        color: 'white',
        fontSize: "20px"
    };

    const fulfilledStyle = {
        position: 'absolute',
        top: '10px', 
        left: '0px',
        right: '0px',
        textAlign: 'right',
        padding: '0px 16px', 
        borderRadius: '4px',
        color: 'white',
        fontWeight: "bold",
        fontSize: "15px"
        
    };

    const footerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        color: "#7D7D7D"
    };

    const cardClickStyle = {
        cursor: 'pointer',
        position: 'relative', 
    };

    

    return (
        <Card sx={{ ...cardStyle, ...cardClickStyle }} onClick={onClick}>
            <CardMedia
                component="img"
                sx={{ width: 150, minWidth: 150, objectFit: 'cover' }}
                image={imageSrc}
                alt="Card Image"
                style={imageStyle}
            />
            <Typography style={titleStyle} variant="caption" sx={{ textAlign: 'left' }}>
                {nameOrganization}
            </Typography>
            <Typography style={fulfilledStyle} variant="caption" sx={{ textAlign: 'left' }}>
                    {(fulfilled || 0) + " of " + required + " raised"}
            </Typography>
            
            <ThemeProvider theme={theme}>
                <LinearProgress
                    variant="determinate"
                    value={(fulfilled / required) * 100}
                    backgroundColor="secondary"
                    
                />
            </ThemeProvider>
            
            <CardContent sx={{paddingTop: "0px", paddingLeft: "7px", paddingRight: "7px", '&:last-child': { pb: 1.5 }}}>

                <Typography sx={{fontWeight: "bold" , paddingBottom:"10px"}}>{title}</Typography> 
                
                <Typography sx={{ paddingBottom: "8px", lineHeight: '1.2', height: '2.8em', overflow: 'hidden' }} variant="body1" gutterBottom>
                    {description}
                </Typography>
                <div style={footerStyle}>
                    <Typography variant="caption" sx={{ textAlign: 'right' }}>
                        {city}
                    </Typography>
                    <Typography variant="caption" sx={{ textAlign: 'right' }}>
                        {date}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardNeedUser;
