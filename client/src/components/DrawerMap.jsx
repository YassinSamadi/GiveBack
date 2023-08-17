import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MobileStepper } from '@mui/material';
import '../style/DrawerMap.scss'
import { createTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const SwipeableTemporaryDrawer = ({ isOpen, onClose, organizationName, organizationID }) => {
    
    const [needs, setNeeds] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [quantityDonated, setQuantityDonated] = useState(0);

    const handleNext = () => {
        setActiveStep((prevStep) => Math.min(prevStep + 1, needs.length - 1));
      };
    
    const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };


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
    

    useEffect(() => {
      if (organizationID) {
        
        const fetchNeeds = async () => {
          try {
            const response = await axios.get(`/organization/${organizationID}/getOrganizationNeedsById`);
            setNeeds(response.data);
          } catch (err) {
            console.error(err);
          }
        };
  
        fetchNeeds();
      }
    }, [organizationID]);

    const handleSubmit = async () => {
        const donation_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user ? user.id : null;
        const need_id = needs[activeStep].id;
    
        try {
            await axios.post('/donations/userDonation', {
                quantity_donated: quantityDonated,
                donation_date,
                user_id,
                need_id
            });
            console.log('Donation made successfully');
            
        } catch (error) {
            console.error('Error making donation:', error);
        }
    };

    const list = (
        <div role="presentation">
          <ListItem style={{ justifyContent: 'center' }} disablePadding>
            <div className="flex-container">
              <img
                src="../assets/logo/GiveBackNoText500x500.png"
                alt="GiveBack Logo"
                height="30px"
                width="30px"
                className="rounded-image center-img"
              />
              <ListItemText primary={organizationName} />
            </div>
          </ListItem>
         
      
          {needs.length > 0 && (
            <ListItem>
              {/* Content when filteredNeeds.length > 0 */}
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  <img
                    src={needs[activeStep].productPicture}
                    alt={needs[activeStep].productName}
                    height="100px"
                    width="100px"
                    className="rounded-image"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '15px' }}>
                  <ListItemText primary={needs[activeStep].needTitle} />
                  <ListItemText primary="Description" secondary={needs[activeStep].needDescription} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '15px' }}>
                  <ListItemText primary="Product" secondary={needs[activeStep].productName} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <ListItemText primary={`${needs[activeStep].needQuantityFulfilled} / ${needs[activeStep].needQuantityRequired}`} />
                </div>
              </div>
            </ListItem>
          )}
      
          {/* Conditional rendering based on needs */}
          {needs && needs.length > 0 ? (
            <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
              {needs[activeStep].needQuantityRequired - needs[activeStep].needQuantityFulfilled > 0 ? (
                // Content when donation can be made
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Slider
                    theme={sliderTheme}
                    value={quantityDonated}
                    onChange={(e, newValue) => setQuantityDonated(newValue)}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    max={needs[activeStep].needQuantityRequired - needs[activeStep].needQuantityFulfilled}
                    backgroundColor="secondary"
                  />
                  <p
                    type="number"
                    id="quantity_donated"
                    name="quantity_donated"
                    
                    style={{ textAlign:'center', flex: 1, marginTop: '10px', marginBottom: '10px' }}
                  >{quantityDonated}</p>
                  <Button
                    variant="outlined"
                    style={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white' }}
                    onClick={handleSubmit}
                  >
                    Submit Donation
                  </Button>
                </div>
              ) : (
                // Content when donation is already fulfilled
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button variant="outlined" style={{ backgroundColor: '#D9D9D9', color: 'white', borderColor: 'white' }} disabled>
                    Donation Fulfilled
                  </Button>
                </div>
              )}
            </ListItem>
          ) : (
            // Content when no needs are available
            <ListItem style={{textAlign:"center"}}>
              <ListItemText primary="No needs available" />
            </ListItem>
          )}
      
          {/* MobileStepper */}
          <MobileStepper
            variant="dots"
            steps={needs.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === needs.length - 1}>
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </div>
      );

    return (
    <div>
        <SwipeableDrawer
            anchor="bottom"
            open={isOpen}
            onClose={onClose}
            onOpen={() => {}}
        >
            {list}
        </SwipeableDrawer>
    </div>
    );
};

export default SwipeableTemporaryDrawer;


