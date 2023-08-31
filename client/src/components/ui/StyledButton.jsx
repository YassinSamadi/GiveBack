import React from 'react';
import Button from '@mui/material/Button';

const StyledButton = ({ onClick, text,icon }) => {
    return (
        <Button
            variant="outlined"
            onClick={onClick}
            sx={{
                backgroundColor: '#90C088',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                    backgroundColor: 'white', 
                    color: '#90C088',
                    borderColor: '#90C088',
                },
            }}
        >
            {icon}{text}
        </Button>
    );
};

export default StyledButton;
