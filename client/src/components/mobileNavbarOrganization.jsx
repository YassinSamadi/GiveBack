import '../style/Navbar.scss'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/GiveBackNoText500x500.png';
import profilepic from '../assets/logo/profile-pic.jpg';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import '../style/MobileNavbar.scss';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import HistoryIcon from '@mui/icons-material/History';
import { useLocation } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ListItemLink from './MenuItemMobileLink';


const drawerWidth = 240;



const MobileNavbarOrg = () => {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  const activeLinkStyle = {
    backgroundColor: 'lightgrey', 
  };

  const listItemStyle = {
    color: 'green', 
  };

  const iconStyles = {
    color: '#90C088',
  };
  const activeBackgroundColor = '#F0F0F0';
  const inactiveBackgroundColor = 'transparent';

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/dashboard/organization' },
    { text: 'Inventory', icon: <InventoryIcon />, link: '/inventory' },
    { text: 'Donations', icon: <VolunteerActivismIcon />, link: '/donations' },
  ];
  

    
  const profile  = (
    <div>
    <Toolbar />
    <Divider />
    <List>
      {[
        { text: 'Edit Profile', icon: <AccountCircleIcon />, link: "/dashboard/organization" }, 
        { text: 'Sign out', icon: <ExitToAppIcon />, link: "/inventory" } 
      ].map(({ text, icon, link }) => (
        <ListItem component={Link} to={link} key={text} style={{
          backgroundColor: link === location.pathname ? activeBackgroundColor : inactiveBackgroundColor,
        }} onClick={handleProfileToggle} disablePadding>
          <ListItemButton>
            <ListItemIcon style={iconStyles}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: '#90C088' }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
  </div>
  
  );

  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ backgroundColor: 'white',display: 'flex', justifyContent: 'space-between', lineHeight:'0'  }} >
            <IconButton
                
                color="black"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
                
            >
                <MenuIcon fontSize="large" />
            </IconButton>
            <Box>
                <Link to="/dashboard">
                    <img src={logo} className={'logo'} alt="logo" />
                </Link>
            </Box>
            <Box>
                <img
                    onClick={handleProfileToggle}
                    src={profilepic}
                    alt="User Profile"
                    className="user-profile-image"
                />
            </Box>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
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
          <Toolbar />
          <Divider />
          {menuItems.map((item) => (
            <ListItemLink key={item.text} primary={item.text} icon={item.icon} to={item.link} closeDrawer={handleDrawerToggle}/>
          ))}

        </Drawer>
      </Box>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
            container={container}
            anchor="right"
            variant="temporary"
            open={profileOpen}
            onClose={handleProfileToggle}
            ModalProps={{
                keepMounted: true, 
            }}
            sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {profile}
        </Drawer>
      </Box>

    </Box>
  );
};

export default MobileNavbarOrg;

