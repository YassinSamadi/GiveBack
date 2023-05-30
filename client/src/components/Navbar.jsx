import '../style/Navbar.scss'
import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/GiveBackRight500x500.png';
import profilepic from '../assets/logo/profile-pic.jpg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const {user, logout} = useContext(AuthContext);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
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
            <Link to="/dashboard/user" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/map" className="navbar-link">
              Map
            </Link>
          </li>
          <li>
            <Link to="/history" className="navbar-link">
              Achievements/History
            </Link>
          </li>
        </ul>
      </div>
      { user ? 
        (<div className="navbar-user">
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
              <li onClick={logout}>Sign Out</li>
            </ul>
          )}
        </div>) :(<div className="navbar-user-profile" ><Link to="/login" className="navbar-link">
              Sign in
            </Link> </div> ) }
    </nav>
  );
};

export default Navbar;

