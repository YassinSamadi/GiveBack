import '../../style/organization/navbarOrg.scss';
import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { OrganizationAuthContext } from '../../context/authContextOrganizations';
import logo from '../../assets/logo/GiveBackRight500x500.png';
import defaultProfilePic from '../../assets/miscellaneous/profile-pic.jpg';

const OrganizationNavbar = () => {
  const { organization, logout } = useContext(OrganizationAuthContext);
  const orgLogo = organization ? organization.logo : '';

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="navbar-logo-image" />
      </div>
      <div className="navbar-menu">
        <ul className="navbar-menu-items">
          <li>
            <Link
              to="/organization/dashboard"
              className={`navbar-link ${location.pathname === '/organization/dashboard' ? 'active' : 'nonactive'}`}
            >
              Home
              {location.pathname === '/organization/dashboard' && <div className="active-line"></div>}
            </Link>
          </li>
          <li>
            <Link
              to="/organization/inventory"
              className={`navbar-link ${location.pathname === '/organization/inventory' ? 'active' : 'nonactive'}`}
            >
              Inventory
              {location.pathname === '/organization/inventory' && <div className="active-line"></div>}
            </Link>
          </li>
          <li>
            <Link
              to="/organization/donations"
              className={`navbar-link ${location.pathname === '/organization/donations' ? 'active' : 'nonactive'}`}
            >
              Donations
              {location.pathname === '/organization/donations' && <div className="active-line"></div>}
            </Link>
          </li>
          <li>
            <Link
              to="/organization/pending"
              className={`navbar-link ${location.pathname === '/pending' ? 'active' : 'nonactive'}`}
            >
              Pending
              {location.pathname === '/organization/pending' && <div className="active-line"></div>}
            </Link>
          </li>
        </ul>
      </div>
      <Box sx={{ display: 'flex', alignItems: 'right', textAlign: 'center' }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }}>
              <img
                src={orgLogo ? `/assets/uploads/logo/${orgLogo}` : defaultProfilePic}
                alt="User Profile"
                className="user-profile-image"
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to="/organization/editprofile">
          <Avatar />
          Edit Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout} component={Link} to="/home">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default OrganizationNavbar;
