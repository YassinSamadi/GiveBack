import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/GiveBackNoText500x500.png';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import ListItemLink from '../MenuItemMobileLink';
import '../../style/organization/mobileNavbarOrg.scss';
import { OrganizationAuthContext } from '../../context/authContextOrganizations';
import defaultProfilePic from '../../assets/miscellaneous/profile-pic.jpg';

const drawerWidth = 240;

const MobileNavbarOrg = () => {
  const location = useLocation();
  const { organization, logout } = useContext(OrganizationAuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  const organization_name = organization ? organization.name : '';
  const organization_logo = organization ? organization.logo : '';

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/organization/dashboard' },
    { text: 'Inventory', icon: <InventoryIcon />, link: '/organization/inventory' },
    { text: 'Donations', icon: <VolunteerActivismIcon />, link: '/organization/donations' },
    { text: 'Pending', icon: <PendingActionsIcon />, link: '/organization/pending' },
  ];

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
        <Toolbar sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', lineHeight: '0' }}>
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
            <Link to="/organization/dashboard">
              <img src={logo} className="logo" alt="logo" />
            </Link>
          </Box>
          <Box>
            <img
              onClick={handleProfileToggle}
              src={organization_logo ? `/assets/uploads/logo/${organization_logo}` : defaultProfilePic}
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
          <div className="drawer-container">
            <div>
              <div className="profile-drawer">
                <img
                  src={organization_logo ? `/assets/uploads/logo/${organization_logo}` : defaultProfilePic}
                  alt="Profile"
                  className="profile-image"
                />
                <div>{`${organization_name}`}</div>
              </div>
            </div>

            <div className="grow">
              <Toolbar />
              <Divider />
              {menuItems.map((item) => (
                <ListItemLink key={item.text} primary={item.text} icon={item.icon} to={item.link} closeDrawer={handleDrawerToggle} />
              ))}
            </div>

            <div>
              <List>
                {[
                  { text: 'Edit Profile', icon: <AccountCircleIcon />, link: '/organization/editprofile', onClick: handleDrawerToggle },
                  { text: 'Sign out', icon: <ExitToAppIcon />, link: '/', onClick: logout },
                ].map(({ text, icon, link, onClick }) => (
                  <ListItem
                    component={Link}
                    to={link}
                    key={text}
                    sx={{
                      backgroundColor: link === location.pathname ? '#F0F0F0' : 'transparent',
                    }}
                    onClick={(event) => {
                      if (onClick) {
                        onClick(event);
                      }
                    }}
                    disablePadding
                  >
                    <Divider />
                    <ListItemButton>
                      <ListItemIcon sx={{ color: '#90C088' }}>{icon}</ListItemIcon>
                      <ListItemText primary={text} sx={{ color: '#90C088' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </Drawer>
      </Box>
    </Box>
  );
};

export default MobileNavbarOrg;
