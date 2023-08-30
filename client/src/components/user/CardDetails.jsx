import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogContentText, Typography } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';
import { createTheme } from '@mui/material/styles';
import '../../style/user/cardDetails.scss';
import { TextField } from '@mui/material';

const CardDetails = ({ open, handleClose, product }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [quantityDonated, setQuantityDonated] = useState(1);
    
    if (!product) return null;

    const sliderTheme = createTheme({
        palette: {
            primary: {
                main: "#90C088", 
            },
            secondary: {
                main: "#D9D9D9", 
            },
        },
    });
    

    const handleSubmit = async () => {
        const donation_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const need_id = product.id;
        try {
            await axios.post('/donations/userDonation', {
                quantity_donated: quantityDonated,
                donation_date,
                need_id
            });
            handleClose();
            setQuantityDonated(1);
            window.location.reload();
        } catch (error) {
            console.error('Error making donation:', error);
        }
    };

    const imgSrc =  `../${product.product_picture}` ;
    const maxValue = product.quantity_required - product.quantity_fulfilled;
    
    const isFulfilled = product.quantity_fulfilled >= product.quantity_required ;
    
    return (
        <Dialog maxWidth={'sm'} fullScreen={fullScreen} sx={{"& .MuiDialog-paper": { borderRadius: fullScreen ? "0%" : "7%",width:"640px"},  }} open={open} onClose={handleClose} >
                <CloseIcon className='close-icon' fontSize='large'
                    onClick={handleClose }
                />
                <DialogTitle className='dialog-title'>{product.title}</DialogTitle>
                    
                <div className='image-background-detail' style={{ backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(0, 0, 1, 1)), url('${imgSrc}')`,}}></div>
                
                <DialogContent>
                    <div className='spacing-org'>
                        <DialogContentText >
                            <h3> <strong>By</strong> {product.organization_name}</h3>
                        </DialogContentText>
                        <DialogContentText>
                            <p >{dayjs(product.date).fromNow()}</p>
                        </DialogContentText>
                    </div>
                    <hr/>
                    <h3>Description</h3>
                    <DialogContentText>
                        <p>{product.description}</p>
                    </DialogContentText>
                    <hr/>
                    
                    {isFulfilled ? (
                        <div className="donation-input">
                            <Button
                                variant="outlined"
                                style={{ backgroundColor:  'lightgrey', color:'white', borderColor: 'white' }} 
                                disabled={true}
                            >
                                submit donation
                            </Button>
                            <Typography>Need fullfilled</Typography>
                        </div>
                    ) : (
                        <div className="donation-input">
                            <Slider
                                theme={sliderTheme}
                                value={quantityDonated}
                                onChange={(e, newValue) => setQuantityDonated(newValue)}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={1}
                                max={maxValue}
                                backgroundColor="secondary"
                                sx={{ width: '60%' }}
                            />
                            <TextField
                                type="number"
                                id="quantity_donated"
                                name="quantity_donated"
                                inputProps={{ min: 1, max: maxValue }}
                                value={quantityDonated}
                                onChange={e => {
                                    const newValue = Math.min(Math.max(e.target.value, 1), maxValue); // Limit the value between min and max
                                    setQuantityDonated(newValue);
                                }}
                                sx={{
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#90C088',
                                    },
                                }}
                            />

                            <Button
                                variant="outlined"
                                style={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white' }}
                                onClick={handleSubmit}
                            >
                                submit donation
                            </Button>
                        </div>
                    )}
                </DialogContent>
        </Dialog>
    );
};

export default CardDetails;
