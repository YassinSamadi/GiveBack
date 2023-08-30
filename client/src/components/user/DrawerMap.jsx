import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MobileStepper } from '@mui/material';
import '../../style/user/drawerMap.scss'
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery, useTheme } from '@mui/material';

const SwipeableTemporaryDrawer = ({ isOpen, onClose, organizationName, organizationID,organizationLogo, organizationAddress }) => {
    const [needs, setNeeds] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [quantityDonated, setQuantityDonated] = useState(0);
    const themeMobile = useTheme();
    const isMobile = useMediaQuery(themeMobile.breakpoints.down('md'));

    const handleNext = () => {
        setActiveStep((prevStep) => Math.min(prevStep + 1, needs.length - 1));
      };
    
    const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const [showFullDescription, setShowFullDescription] = useState(false);

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
      const need_id = needs[activeStep].needId; 
  
      try {
          await axios.post('/donations/userDonation', {
              quantity_donated: quantityDonated,
              donation_date,
              need_id
          });
          
      } catch (error) {
          console.error('Error making donation:', error);
      }
  };

    const theme = createTheme({
      components: {
        MuiMobileStepper: {
          styleOverrides: {
            dotActive: {backgroundColor: '#90C088',},
            dot: {backgroundColor: 'lightgray',},
            progress: {backgroundColor: 'lightgray', },
            root: {backgroundColor: 'transparent', },
          },
        },
        MuiButtonBase: {
          "root": {    
            "&.Mui-disabled": {      
              "color": "rgba(144, 192, 136, 0.5)"    
            }  
          }
        },
      },
    });
    
      const list = (
          <div >
            <ListItem sx={{justifyContent:'center'}} disablePadding>
              <div className="flex-container">
                <img
                  src={`/assets/uploads/logo/${organizationLogo}`}
                  alt="Organization Logo"
                  className="org-image center-img"
                />
                <ListItemText primary={organizationName} />
              </div>
            </ListItem>
            
            {needs.length > 0 && (
              <ListItem sx={{justifyContent:'center'}}>
                <div>
                  {isMobile ? (
                      <div className='mobile-center-content'>
                        <ListItemText
                            primary={needs[activeStep].needTitle}
                            primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '20px' } }}
                          />
                        <img
                          src={needs[activeStep].productPicture}
                          alt={needs[activeStep].productName}
                          className="product-image"
                        />
                        <div>
                        <ListItemText
                          primary="Product"
                          secondary={needs[activeStep].productName}
                          className='product-name'
                        />
                      </div>
                      <div className='mobile-description-container'>
                        <ListItemText
                            sx={{height: showFullDescription ? 'auto' : '100px',}}
                            className='mobile-description-item'
                            primary="Description"
                            secondary={needs[activeStep].needDescription}
                        />
                        {needs[activeStep].needDescription.length > 200 && (
                            <button onClick={() => setShowFullDescription(!showFullDescription)}>
                                {showFullDescription ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                        {needs[activeStep].needDescription.length <= 200 && (
                            <div className='margin-top-description'>
                            </div>
                        )}
                      </div>
                </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                      <div >
                        <img
                          src={needs[activeStep].productPicture}
                          alt={needs[activeStep].productName}
                          className="product-image"
                        />
                        <div style={{}}>
                        <ListItemText primary="Product" secondary={needs[activeStep].productName} />
                      </div>
                    </div>
                    <div style={{alignContent:'center',alignItems:'center',textAlign:'center', justifyContent:'center ',}}>
                      <div style={{ marginLeft: '40px' }}>
                        <ListItemText primary={needs[activeStep].needTitle} primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize:'20px' } }}/>
                          <ListItemText
                            style={{display: 'flex', }}
                          >
                            <span style={{marginRight:'20px'}}>
                              Description
                            </span>
                            <p  style={{height: '200px',width: '500px', marginBottom:'40px'}}>
                              {needs[activeStep].needDescription}
                            </p>
                          </ListItemText>  
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </ListItem>
            )}
            {needs && needs.length > 0 ? (
              <ListItem sx={{justifyContent: 'space-evenly'}} >
                {needs[activeStep].needQuantityRequired - needs[activeStep].needQuantityFulfilled > 0 ? (
                  <div>
                    {isMobile ? (
                      <div className='column-flex'>
                        <div className='alignment-raised'>
                          <ListItemText primary={`${needs[activeStep].needQuantityFulfilled} of ${needs[activeStep].needQuantityRequired} raised`} />
                        </div>

                        <div className='donation-container'>
                          <Slider
                            theme={sliderTheme}
                            value={quantityDonated}
                            onChange={(e, newValue) => setQuantityDonated(newValue)}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            min={1}
                            max={needs[activeStep].needQuantityRequired - needs[activeStep].needQuantityFulfilled}
                            backgroundColor="secondary"
                          />
                          <p
                            type="number"
                            id="quantity_donated"
                            name="quantity_donated"
                            className='quantity-donated-text'
                          >{quantityDonated}</p>
                          <Button
                            variant="outlined"
                            style={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white' }}
                            onClick={handleSubmit}
                          >
                            Submit Donation
                          </Button>
                        </div>

                        <div className='alignment-address'>
                          <ListItemText primary={organizationAddress} />
                        </div>
                        
                      </div>

                      ):(
                      <div className='flex'>
                        <div className='alignment-raised-desktop'>
                          <ListItemText primary={`${needs[activeStep].needQuantityFulfilled} of ${needs[activeStep].needQuantityRequired} raised`} />
                        </div>
                        <div className='donation-container-desktop'>
                          <Slider
                            theme={sliderTheme}
                            value={quantityDonated}
                            onChange={(e, newValue) => setQuantityDonated(newValue)}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            min={1}
                            max={needs[activeStep].needQuantityRequired - needs[activeStep].needQuantityFulfilled}
                            backgroundColor="secondary"
                          />
                          <p
                            type="number"
                            id="quantity_donated"
                            name="quantity_donated"
                            className='quantity-donated-text-desktop'
                          >{quantityDonated}</p>
                          <Button
                            variant="outlined"
                            style={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white' }}
                            onClick={handleSubmit}
                          >
                            Submit Donation
                          </Button>
                        </div>
                      <div className='alignment-address-desktop'>
                        <ListItemText primary={organizationAddress}/>
                      </div>
                    </div>
                    )}
                  </div>
                ) : (
                  <div className='alignment-column-fulfilled'>
                    <Button variant="outlined" style={{ backgroundColor: '#D9D9D9', color: 'white', borderColor: 'white' }} disabled>
                      Donation Fulfilled
                    </Button>
                  </div>
                        )}
                      </ListItem>
                    ) : (
                      <ListItem className='align-text-center'>
                        <ListItemText primary="No needs available" />
                      </ListItem>
                    )}
        
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
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


