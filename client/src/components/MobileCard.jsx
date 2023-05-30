import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const MobileCard = ({ imageSrc, title, description, date, number,onClick }) => {
    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f5f5f5',
        maxWidth: 350, 
        margin: '0 auto',
        marginTop: 3,
    };

    const imageStyle = {
        width: '100%',
        height: 160,
        objectFit: 'cover',
    };

    const footerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    return (
        <Card  onClick={onClick} sx={cardStyle}>
            <CardMedia component="img" src={imageSrc} alt="Card Image" style={imageStyle} />
            <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {description}
                </Typography>
                <div style={footerStyle}>
                    <Typography variant="caption">
                        {number}
                    </Typography>
                    <Typography variant="caption">
                        {date}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default MobileCard;
