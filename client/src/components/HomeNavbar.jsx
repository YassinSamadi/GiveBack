import '../style/Navbar.scss'
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import logo from '../assets/logo/GiveBackRight500x500.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';


const HomeNavbar = () => {
    // const [showUserMenu, setShowUserMenu] = useState(false);
    // const {user, logout} = useContext(AuthContext);

    // const toggleUserMenu = () => {
    //     setShowUserMenu(!showUserMenu);
    // };

    // const handleEditProfile = () => {
    //     //edit profile
    // };
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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

            {isMobile ? (
                <>
                <div className="navbar-menu">
                <ul className="navbar-menu-items">
                    <li>
                        <Link to="/dashboard/user" className="navbar-link">
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/map" className="navbar-link">
                        How it works
                        </Link>
                    </li>
                    <li>
                        <Link to="/history" className="navbar-link">
                        About us
                        </Link>
                    </li>
                </ul>
                </div>

                <div className="navbar-user">
                    <div className="navbar-user-profile" >
                        <Button href='/login' variant="outlined">Sign in</Button>
                    </div>
                </div>
                </>
            ):(
                <MenuIcon onClick={handleDrawerToggle}></MenuIcon>
            )}

        </nav>
    );
};

export default HomeNavbar;

