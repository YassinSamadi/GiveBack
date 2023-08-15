import {createBrowserRouter, RouterProvider, Outlet,} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/mobileNavbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Footer from "./components/Footer";
<<<<<<< Updated upstream

=======
import './style/App.scss';
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import { useMediaQuery, useTheme } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from "./pages/Map";
import DashboardOrganization from "./pages/DashboardOrganization";
import DonationsInfo  from "./pages/DonationsInfo";
import RegisterOrganization from "./pages/RegisterOrganization";
import LoginOrganization from "./pages/LoginOrganization";
import OrganizationNavbar from "./components/OrganizationNavbar";
import HomeNavbar from "./components/HomeNavbar";
import MobileNavbarOrg from "./components/mobileNavbarOrganization";
>>>>>>> Stashed changes
const Layout =() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {isMobile ? <MobileNavbar/>  : <Navbar/>}
        <Outlet/>
      <Footer/>
    </>
  )
}
const OrganizationLayout =() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
<<<<<<< Updated upstream
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
=======
      {isMobile ? <MobileNavbar/>  : <Navbar/>}
        <Outlet/>
      
    </>
  )
}

const OrganizationLayout =() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {isMobile ? <MobileNavbarOrg/>  : <OrganizationNavbar/>}
        <Outlet/>
      
    </>
  )
}
const HomepageLayout =() => {
  const theme = useTheme();

  return (
    <>
      <HomeNavbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

>>>>>>> Stashed changes

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children: [ 
<<<<<<< Updated upstream
      { 
        path: "/home", 
        element: <Home/> 
      },
      { 
        path: "/dashboard/user", 
        element: <Dashboard/> 
      },
      
=======
      
      { 
        path: "/dashboard/user", 
        element: <Dashboard/> 
      },
      
      { 
        path: "/map", 
        element: <Map/> 
      },
      { 
        path: "/history",
        element: <History/> 
      }
    ],
  },
  {
    path: "/",
    element:<OrganizationLayout/>,
    children: [ 
      { 
        path: "/dashboard/organization", 
        element: <DashboardOrganization/> 
      },
      { 
        path: "/donations", 
        element: <DonationsInfo/> 
      },
      { 
        path: "/inventory", 
        element: <Inventory/> 
      },
    ],
  },
  {
    path: "/",
    element:<HomepageLayout/>,
    children: [ 
      
      { 
        path: "/home", 
        element: <Home/> 
      },
>>>>>>> Stashed changes
    ],
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/organization",
    element: <RegisterOrganization/>,
  },
  {
    path: "/login/organization",
    element: <LoginOrganization />,
  },

]);

function App() {
  return (
    <div className="app ">
      <div className="container ">
        <RouterProvider router={router}/>
      </div>
    </div>
    );
}



export default App;
