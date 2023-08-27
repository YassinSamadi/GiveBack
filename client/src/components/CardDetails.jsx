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
import '../style/CardDetails.scss';

const CardDetails = ({ open, handleClose, product }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [quantityDonated, setQuantityDonated] = useState(0);
    
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
            console.log('Donation made successfully');
            handleClose();
        } catch (error) {
            console.error('Error making donation:', error);
        }
    };
    console.log('Product:', product.product_name);

    const imgSrc =  `../${product.product_picture}` ;
    const maxValue = product.quantity_required - product.quantity_fulfilled;
    
    const isFulfilled = product.quantity_fulfilled >= product.quantity_required ;
    console.log('isFulfilled:', isFulfilled);
    const closeClickStyle = {
        cursor: 'pointer'
    };
    
    return (
        <Dialog maxWidth={'sm'} fullScreen={fullScreen} sx={{"& .MuiDialog-paper": { borderRadius: fullScreen ? "0%" : "7%",width:"640px"},  }} open={open} onClose={handleClose} >
                <CloseIcon style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px', 
                    borderRadius: '100%',
                    color: '#90C088',
                    backgroundColor: 'white',
                    border: '3px solid #90C088',
                    fontSize: '40px', ...closeClickStyle}} 
                    onClick={handleClose}
                />
                <DialogTitle style={{position: 'absolute',
                    top: '250px', 
                    left: '0px',
                    right: '0px',
                    padding: '4px 16px', 
                    color: 'white',
                    fontSize: "20px"}}>{product.title}</DialogTitle>
                    
                <div style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(0, 0, 1, 1)), url('${imgSrc}')`,
                    width: "100%",
                    minHeight: "300px",
                    objectFit: 'cover',
                }}></div>
            <DialogContent>
                <div style={{display:"flex", justifyContent:"space-between"}}>
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
                {/* <DialogContentText>
                    <p >{product.organization_city}</p>
                </DialogContentText>
                <DialogContentText>
                    <p >{product.quantity_fulfilled}</p>
                </DialogContentText>
                <DialogContentText>
                    <p >{product.quantity_required}</p>
                </DialogContentText> */}
                
                
                
                {isFulfilled ? (
                    <div class="donation-input">
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
                    <div class="donation-input">
                        <Slider
                            theme={sliderTheme}
                            value={quantityDonated}
                            onChange={(e, newValue) => setQuantityDonated(newValue)}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            max={maxValue}
                            backgroundColor="secondary"
                            style={{ width: '60%' }}
                        />
                        <input
                            type="number"
                            id="quantity_donated"
                            name="quantity_donated"
                            min="0"
                            max={maxValue}
                            value={quantityDonated}
                            onChange={e => setQuantityDonated(e.target.value)}
                            style={{ border: '1px solid #90C088', flex: 1 }}
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
