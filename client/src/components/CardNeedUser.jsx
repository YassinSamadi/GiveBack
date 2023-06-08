import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import Button from '@mui/material/Button';

const CardNeedUser = ({ imageSrc, title, description, date, fulfilled, required, onClick, nameOrganization, city }) => {
  const cardStyle = {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    maxWidth: 650,
    margin: '0 auto',
    marginTop: 3,
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const isFulfilled = fulfilled === required;

  return (
    <Card sx={cardStyle}>
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
            {fulfilled} / {required}
          </Typography>
          <Typography variant="caption" sx={{ textAlign: 'right' }}>
            {date}
          </Typography>
        </div>
        <div style={footerStyle}>
          <Typography variant="caption" sx={{ textAlign: 'left' }}>
            {nameOrganization}
          </Typography>
          <Typography variant="caption" sx={{ textAlign: 'right' }}>
            {city}
          </Typography>
        </div>
        {isFulfilled ? (
          <Typography variant="caption" sx={{ textAlign: 'center' }}>
            Need Fulfilled
          </Typography>
        ) : (
          <Button
            variant="outlined"
            style={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white' }}
            onClick={onClick}
          >
            Donate
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CardNeedUser;
