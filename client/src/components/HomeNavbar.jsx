import '../style/HomeNavbar.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/GiveBackRight500x500.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { Link as ScrollLink } from 'react-scroll';

const drawerWidth = 300;

const HomeNavbar = () => {

    const container = typeof window !== 'undefined' ? () => window.document.body : undefined;

    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <nav className="navbar sticky">
            <div className="navbar-logo">
                <img
                src={logo}
                alt="Logo"
                className="navbar-logo-image"
                />
            </div>

            {isMobile ? (
                <>
                <div className="navbar-menu">
                <ul className="navbar-menu-items cursor">
                    <li>
                        <ScrollLink to="home" smooth={true} duration={500}>
                            Home
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="howitworks" smooth={true} duration={500}>
                            How it works
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="aboutus" smooth={true} duration={500}>
                            About us
                        </ScrollLink>
                    </li>
                </ul>
                </div>

                <div className="navbar-user">
                    <div className="navbar-user-profile">
                        <Button href='/login' variant="outlined" className='button-signin'>Sign in</Button>
                    </div>
                </div>

                </>
            ):(
                <div>
                    <MenuIcon className='hamburger' onClick={handleDrawerToggle}></MenuIcon>
                    <Drawer
                    anchor='right'
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                        }}
                        sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <div className='container-mobile'>
                            <div style={{ flexGrow: 1 }}>
                                <Toolbar />
                                <Divider />
                                <ScrollLink to="home" smooth={true} duration={500} onClick={handleDrawerToggle}>
                                    <ListItem className='green-color'>
                                        <HomeIcon/>
                                        <ListItemText primary={'Home'} className='menu-item-text' />
                                    </ListItem>
                                </ScrollLink>
                                <ScrollLink to="howitworks" smooth={true} duration={500} onClick={handleDrawerToggle}>
                                    <ListItem className='green-color'>
                                        <Diversity3Icon/>
                                        <ListItemText primary={'How it works'} className='menu-item-text' />
                                    </ListItem>
                                </ScrollLink>
                                <ScrollLink to="aboutus" smooth={true} duration={500} onClick={handleDrawerToggle}>
                                    <ListItem className='green-color'>
                                        <InfoIcon/>
                                        <ListItemText primary={'About us'} className='menu-item-text' />
                                    </ListItem>
                                </ScrollLink>
                                
                            </div>
                            <div>
                                <List>
                                    <ListItem
                                    component={Link}
                                    to={'/login'}
                                    style={{
                                    }}
                                    disablePadding
                                    >
                                        
                                    <Divider />
                                        <ListItemButton>
                                            <LoginIcon className='green-color'/>
                                            <ListItemText primary={'Sign in'} className='menu-item-text' />
                                        </ListItemButton>
                                    </ListItem>
                                
                                </List>
                            </div>
                            </div>
                        
                    </Drawer>
                </div>
            )}

        </nav>
    );
};

export default HomeNavbar;

