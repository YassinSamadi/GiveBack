import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MuiCard = ({ imageSrc, title, description, date, fulfilled, required, onClick, showActions, onEdit, onDelete }) => {
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
                        {fulfilled} / {required}
                    </Typography>
                    <Typography variant="caption" sx={{ textAlign: 'right' }}>
                        {date}
                    </Typography>
                </div>
            </CardContent>
            {showActions && (
                <div>
                    <IconButton onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
        </Card>
    );
};

export default MuiCard;
