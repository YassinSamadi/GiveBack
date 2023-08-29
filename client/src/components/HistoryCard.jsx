import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    margin: '25px',
};

const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
};

const iconStyle = {
    fontSize: '72px',
};

const numberStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '8px',
};

const textStyle = {
    fontSize: '18px',
};

const HistoryCard = ({ icon: IconComponent, number, description }) => {
    const displayNumber = number !== undefined && number !== '' ? number : '-';

    return (
        <Card sx={cardStyle}>
            <CardContent sx={contentStyle}>
                <IconComponent sx={iconStyle} />
                <Typography variant="h2" sx={numberStyle}>
                    {displayNumber}
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};


export default HistoryCard;
