import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const MuiCard = ({ imageSrc, title, description, date, number,onClick }) => {
    const cardStyle = {
        backgroundColor: '#f5f5f5',
        display: 'flex',
        maxWidth: 650,
        margin: '0 auto',
        marginTop: 3,
        maxHeight: 150,
    };

    const footerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    return (
        <Card onClick={onClick} sx={cardStyle}>
            <CardMedia
                component="img"
                sx={{ width: 150, minWidth: 150, objectFit: 'cover' }}
                image={imageSrc}
                alt="Card Image"
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {description}
                </Typography>
                <div style={footerStyle}>
                    <Typography variant="caption" sx={{ textAlign: 'left' }}>
                        {number}
                    </Typography>
                    <Typography variant="caption" sx={{ textAlign: 'right' }}>
                        {date}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default MuiCard;
