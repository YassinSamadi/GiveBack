import '../../style/organization/navbarOrg.scss'
import React, { useState,useContext } from 'react';
import logo from '../../assets/logo/GiveBackRight500x500.png';
import profilepic from '../../assets/logo/profile-pic.jpg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { OrganizationAuthContext } from '../../context/authContextOrganizations';
import { Link, useLocation } from 'react-router-dom';

const OrganizationNavbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const {organization, logout} = useContext(OrganizationAuthContext);

  const orgLogo = organization ? organization.logo : '';

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };


  const handleEditProfile = () => {
    
  };

  const location = useLocation();

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
          <Link to="/dashboard/organization"  className={`navbar-link ${location.pathname === '/dashboard/organization' ? 'active' : 'nonactive'}`}>
            Home
            {location.pathname === '/dashboard/organization' && <div className="active-line"></div>}
          </Link>
        </li>
        <li>
          <Link to="/inventory"  className={`navbar-link ${location.pathname === '/inventory' ? 'active' : 'nonactive'}`}>
            Inventory
            {location.pathname === '/inventory' && <div className="active-line"></div>}
          </Link>
        </li>
        <li>
          <Link to="/donations"  className={`navbar-link ${location.pathname === '/donations' ? 'active' : 'nonactive'}`}>
            Donations
            {location.pathname === '/donations' && <div className="active-line"></div>}
          </Link>
        </li>
        <li>
          <Link to="/pending"  className={`navbar-link ${location.pathname === '/pending' ? 'active' : 'nonactive'}`}>
          Pending
            {location.pathname === '/pending' && <div className="active-line"></div>}
          </Link>
        </li>
      </ul>
      </div>
      { organization ? 
        (<div className="navbar-user">
          <div className="navbar-user-profile" >
            <img
              src={`/assets/uploads/logo/${orgLogo}`}
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
        </div>) :(<div className="navbar-user-profile" ><Link to="/login/organization" className="navbar-link">
              Sign in
            </Link> </div> ) }
    </nav>
  );
};

export default OrganizationNavbar;
