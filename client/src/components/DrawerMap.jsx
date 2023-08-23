import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect,useContext  } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MobileStepper } from '@mui/material';
import '../style/DrawerMap.scss'
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

    const theme = createTheme({
      components: {
        MuiMobileStepper: {
          styleOverrides: {
            dotActive: {
              backgroundColor: '#90C088',
            },
            dot: {
              backgroundColor: 'lightgray',
            },
            progress: {
              backgroundColor: 'lightgray', 
            },
            root: {
              backgroundColor: 'transparent', 
            },
          },
        },
        MuiButtonBase: {
          styleOverrides: {
            root: {
              color: '#90C088', 
            },
            disabled: {
              color: 'rgba(144, 192, 136, 0.5)', 
            },
          },
        },
      },
    });
    
    

    const list = (
        <div role="presentation">
          <ListItem style={{ justifyContent: 'center' }} disablePadding>
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
            <ListItem style={{justifyContent:"center"}}>
              {/* Content when filteredNeeds.length > 0 */}
              <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div style={{justifyContent:"center"}}>
                  <img
                    src={needs[activeStep].productPicture}
                    alt={needs[activeStep].productName}
                    className="product-image"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText primary="Product" secondary={needs[activeStep].productName} />
                </div>
                </div >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '40px' }}>
                  <ListItemText primary={needs[activeStep].needTitle} primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize:'20px' } }}/>
                  {isMobile ?
                    <ListItemText style={{height:'200px', width:'300px'}} primary="Description" secondary={needs[activeStep].needDescription} />
                  :
                    <ListItemText
                      style={{display: 'flex', }}
                    >
                    <span style={{marginRight:'20px'}}>
                        Description
                      </span>
                      <span  style={{
                                    
                        height: '200px',
                        width: '300px',
                      }}>
                        {needs[activeStep].needDescription}
                      </span>
                      
                    </ListItemText>  
                  }
                  
                </div>
                
                
              </div>
            </ListItem>
          )}
      
          {/* Conditional rendering based on needs */}
          {needs && needs.length > 0 ? (
            <ListItem style={{justifyContent: 'space-evenly',}} >
              {needs[activeStep].needQuantityRequired - needs[activeStep].needQuantityFulfilled > 0 ? (
                <div style={{ display: 'flex' }}>
                  {/* Needs Section */}
                  <div style={{ display:'flex', textAlign: 'left', alignItems:'flex-start'  }}>
                    <ListItemText primary={`${needs[activeStep].needQuantityFulfilled} of ${needs[activeStep].needQuantityRequired} raised`} />
                  </div>
                  
                  {/* Donation Section */}
                  <div style={{ flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
                      style={{ textAlign:'center', marginTop: '10px', marginBottom: '10px' }}
                    >{quantityDonated}</p>
                    <Button
                      variant="outlined"
                      style={{ backgroundColor: '#90C088', color: 'white', borderColor: 'white' }}
                      onClick={handleSubmit}
                    >
                      Submit Donation
                    </Button>
                  </div>
                
                {/* Organization Address */}
                <div style={{ flex: 1, textAlign: 'right', alignItems:'flex-end'  }}>
                  <ListItemText primary={organizationAddress}/>
                </div>
              </div>
              
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button variant="outlined" style={{ backgroundColor: '#D9D9D9', color: 'white', borderColor: 'white' }} disabled>
                    Donation Fulfilled
                  </Button>
                </div>
              )}
            </ListItem>
          ) : (
            <ListItem style={{textAlign:"center"}}>
              <ListItemText primary="No needs available" />
            </ListItem>
          )}
      
          {/* MobileStepper */}
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


