import React from 'react';
import Button from '@mui/material/Button';

const ReversedButton = ({ onClick, text,icon }) => {
    return (
        <Button
            variant="outlined"
            onClick={onClick}
            sx={{
                backgroundColor: 'white',
                color: '#90C088',
                borderColor: '#90C088',
                '&:hover': {
                    backgroundColor: ' #90C088', 
                    color: 'white',
                    borderColor: 'white',
                },
            }}
        >
            {icon}{text}
        </Button>
    );
};

export default ReversedButton;
