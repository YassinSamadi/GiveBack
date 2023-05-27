import '../style/Navbar.scss'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/GiveBackRight500x500.png';
import profilepic from '../assets/logo/profile-pic.jpg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleSignOut = () => {
    // Implement your sign out logic here
  };

  const handleEditProfile = () => {
    // Implement your edit profile logic here
  };


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
            <Link to="/dashboard" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/map" className="navbar-link">
              Map
            </Link>
          </li>
          <li>
            <Link to="/item3" className="navbar-link">
              Achievements/History
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-user">
        <div className="navbar-user-profile" >
          <img
            src={profilepic}
            alt="User Profile"
            className="user-profile-image"
          />
          {showUserMenu ? (
            <KeyboardArrowUpIcon onClick={toggleUserMenu} />
          ) : (
            <KeyboardArrowDownIcon onClick={toggleUserMenu} />
          )}
        </div>
        {showUserMenu && (
          <ul className="navbar-user-menu">
            <li onClick={handleEditProfile}>Edit Profile</li>
            <li onClick={handleSignOut}>Sign Out</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

