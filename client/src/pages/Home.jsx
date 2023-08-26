import React from 'react';
import HomeNavbar from '../components/HomeNavbar.jsx';
import hero from '../assets/miscellaneous/hero.jpg';
import aboutus from '../assets/miscellaneous/aboutus.jpg';
import whatwedo from '../assets/miscellaneous/whatwedo.jpg';
import donation from '../assets/miscellaneous/donation.png';


import '../style/home.scss';
import { Grid } from '@mui/material';

export const Home = () => {
  return (
    <div>
      <div className="hero-container ">
      </div>
      <div className="center-text short-info">
        <p className="test">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum!
        </p>
      </div>

      <Grid container spacing={0} style={{ backgroundColor: "#EDECEC", color: "white" }}>
      <Grid item xs={12} md={12} lg={4} style={{ padding: "20px" }}>
          <div className="grid-item-container" style={{ backgroundColor: "#90C088" }}>
            <div class="image-container">
              <img src={donation} alt="donation" className="aboutus-image" style={{width:"100px", height: "100px"}}/>
            </div>
            <div class="about-container">
              <h2>About us</h2>
              <p style={{width:"300px"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum!
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={12} lg={4} style={{ padding: "20px" }}>
          <div className="grid-item-container" style={{ backgroundColor: "#90C088" }}>
            <div class="image-container">
              <img src={donation} alt="donation" className="aboutus-image" style={{width:"100px", height: "100px"}}/>
            </div>
            <div class="about-container">
              <h2>About us</h2>
              <p style={{width:"300px"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum!
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={12} lg={4} style={{ padding: "20px" }}>
          <div className="grid-item-container" style={{ backgroundColor: "#90C088" }}>
            <div class="image-container">
              <img src={donation} alt="donation" className="aboutus-image" style={{width:"100px", height: "100px"}}/>
            </div>
            <div class="about-container">
              <h2>About us</h2>
              <p style={{width:"300px"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum!
              </p>
            </div>
          </div>
        </Grid>
      </Grid>

      <div className="extra_info">
        <div class="full-width" >
          <div class="image-container">
            <img src={aboutus} alt="aboutus" className="extra-info-image"/>
          </div>
          <div class="extra-info-container height-extra-info">
            <h2>About us</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
              molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
              numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
              optio, eaque rerum!
            </p>
          </div>
        </div>
        <div class="full-width" >
        <div class="image-container mobile">
            <img src={aboutus} alt="aboutus" className="extra-info-image" />
          </div>
          <div class="extra-info-container height-extra-info">
            <h2>About us</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
              molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
              numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
              optio, eaque rerum!
            </p>
          </div>
          <div class="image-container desktop">
            <img src={aboutus} alt="aboutus" className="extra-info-image" />
          </div>
        </div>
      </div>

      <div className="aboutus">
        <div class="image-container">
          <img src={aboutus} alt="aboutus" className="aboutus-image" style={{maxWidth:"700px", maxHeight: "400px"}}/>
        </div>
        <div class="about-container about-us">
          <h2>About us</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
