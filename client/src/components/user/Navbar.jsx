import '../../style/user/navbar.scss'
import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/GiveBackRight500x500.png';
import defaultProfilePic from '../../assets/miscellaneous/profile-pic.jpg';
import { AuthContext } from '../../context/authContext';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';


const Navbar = () => {
  const {user, logout} = useContext(AuthContext);
  const [showInventoriesLink, setShowInventoriesLink] = useState(false);

  useEffect(() => {
    const inNeedValue = JSON.parse(localStorage.getItem("user"))?.inNeed;
    setShowInventoriesLink(inNeedValue === 1);
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const inNeedValue = user && user?.inNeed;

    setShowInventoriesLink(inNeedValue === 1 || inNeedValue === "true");
}, [setShowInventoriesLink]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const location = useLocation();

  const user_profilepic = user ? user.profile_pic : '';

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src={logo}
          alt="Logo"
          className="navbar-logo-image"
        />
      </div>
      <div className="navbar-menu">
        <ul className="navbar-menu-items">
          <li>
            <Link to="/user/dashboard" className={`navbar-link ${location.pathname === '/user/dashboard' ? 'active' : 'nonactive '}`}>
              Home
              {location.pathname === '/user/dashboard' && <div className="active-line"></div>}
            </Link>
          </li>
          <li>
            
            <Link to="/user/map" className={`navbar-link ${location.pathname === '/user/map' ? 'active' : 'nonactive '}`}>
            Map
              {location.pathname === '/user/map' && <div className="active-line"></div>}
            </Link>
          </li>
          {showInventoriesLink && ( 
            <li>
              <Link to="/user/inventories" className={`navbar-link ${location.pathname === '/user/inventories' ? 'active' : 'nonactive '}`}>
                Inventories
                {location.pathname === '/user/inventories' && <div className="active-line"></div>}
              </Link>
            </li>
          )}
          <li>
            <Link to="/user/history" className={`navbar-link ${location.pathname === '/user/history' ? 'active' : 'nonactive '}`}>
              History
              {location.pathname === '/user/history' && <div className="active-line"></div>}
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
                  <Avatar sx={{ width: 40, height: 40 }} ><img
                      src={user_profilepic ? `/assets/uploads/profilepic/${user_profilepic}` : defaultProfilePic}
                    alt="User Profile"
                    className="user-profile-image"
                  /></Avatar>
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
              <MenuItem component={Link} to="/user/editprofile">
                <Avatar />Edit Profile
              </MenuItem>
              <Divider />
              
              <MenuItem onClick={logout} component={Link} to='/'>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
    </nav>
  );
};

export default Navbar;

