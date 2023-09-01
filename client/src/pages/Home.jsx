import aboutus from '../assets/miscellaneous/aboutus.jpg';
import whatwedo from '../assets/miscellaneous/whatwedo.jpg';
import howwework from '../assets/miscellaneous/howwework.jpg';
import donation from '../assets/miscellaneous/donation.png';
import BarChartIcon from '@mui/icons-material/BarChart';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import '../style/home.scss';
import { Grid } from '@mui/material';

export const Home = () => {
  return (
    <div>
      <div id="home" className="hero-container ">
      </div>
      <div className="center-text short-info">
        <p className="test">
          GiveBack is a revolutionary platform at the intersection of technology and compassion. Our app empowers users to combat food waste, support those in need, and cultivate sustainable habits. 
        </p>
      </div>

      <Grid container spacing={0} sx={{ backgroundColor: "#EDECEC", color: "white" }}>
      <Grid item xs={12} md={12} lg={4} sx={{ padding: "20px" }}>
          <div className="grid-item-container green-background" >
            <div className="image-container">
              <img src={donation} alt="donation" className="image-midsection" />
            </div>
            <div className="about-container ">
              <h2>Discover & Donate</h2>
              <p >
              Find local food banks effortlessly and contribute to your community's well-being.
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={12} lg={4} sx={{ padding: "20px" }}>
          <div className="grid-item-container green-background">
            <div className="image-container">
              <TravelExploreIcon sx={{fontSize:"100px"}}/>
            </div>
            <div className="about-container">
              <h2>Suggested Donations</h2>
              <p >
              Make a meaningful impact by donating the most needed food items.
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={12} lg={4} sx={{ padding: "20px" }}>
          <div className="grid-item-container green-background">
            <div className="image-container">
            <BarChartIcon sx={{fontSize:"100px"}}/>
            </div>
            <div className="about-container">
              <h2>Track Your Giving</h2>
              <p >
              Keep tabs on your contributions and plan future donations with ease.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>

      <div id="howitworks" className="extra_info">
        <div className="full-width" >
          <div className="image-container">
            <img src={howwework} alt="aboutus" className="extra-info-image"/>
          </div>
          <div className="extra-info-container height-extra-info">
            <h2>Empowering Impactful Donations</h2>
            <p>
            Our app doesn't just direct you to the nearest centers; it empowers you to make donations that truly matter. 
            We provide insights into the most-needed food items, 
            ensuring that your contributions have the maximum effect. 
            </p>
          </div>
        </div>
        <div className="full-width" >
        <div className="image-container mobile">
            <img src={whatwedo} alt="aboutus" className="extra-info-image" />
          </div>
          <div className="extra-info-container height-extra-info">
          <h2>How We Work</h2>
            <p>
            We leverage cutting-edge location-based technology to 
            connect donors with local food banks and compassionate 
            organizations that welcome food donations. 
            Our innovative app serves as your guide to discovering nearby 
            centers where you can make a tangible impact.
            </p>
          </div>
          <div className="image-container desktop">
            <img src={whatwedo} alt="aboutus" className="extra-info-image" />
          </div>
        </div>
      </div>

      <div id="aboutus" className="aboutus">
        <div className="image-container">
          <img src={aboutus} alt="aboutus" className="aboutus-image" />
        </div>
        <div className="about-container about-us">
          <h2>About us</h2>
          <p>
          Welcome to GiveBack, where technology meets altruism. 
          We're a passionate team dedicated to tackling food waste, 
          supporting communities, and fostering sustainable consumption. 
          Our mission is to bridge the gap between surplus and need, 
          inspiring positive change through a user-friendly and impactful platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
