import {createBrowserRouter, RouterProvider, Outlet,} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { Navigate, Route } from "react-router-dom";
import { useContext } from "react";
import { OrganizationAuthContext } from "./context/authContextOrganizations";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Inventory from "./pages/organization/Inventory";
import Pending from "./pages/organization/Pending";
import Dashboard from "./pages/user/Dashboard";
import History from "./pages/user/History";
import Map from "./pages/user/Map";
import Inventories from "./pages/user/Inventories";
import DashboardOrganization from "./pages/organization/DashboardOrganization";
import DonationsInfo  from "./pages/organization/DonationsInfo";
import RegisterOrganization from "./pages/RegisterOrganization";
import LoginOrganization from "./pages/LoginOrganization";
import EditProfile from "./pages/user/EditProfile";
import { useMediaQuery, useTheme } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import OrganizationNavbar from "./components/organization/OrganizationNavbar";
import HomeNavbar from "./components/HomeNavbar";
import MobileNavbarOrg from "./components/organization/MobileNavbarOrganization";
import Footer from "./components/Footer";
import Navbar from "./components/user/Navbar";
import MobileNavbar from "./components/user/MobileNavbar";
import EditProfileOrg from "./pages/organization/EditProfileOrg";
import './style/App.scss';
import './style/global.scss'

const Layout =() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
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

  return (
    <>
      <HomeNavbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
function PrivateRouteUser({ children }) {
  const { user } = useContext(AuthContext); 

  return user ? children : <Navigate to="/login" />;
}
function PrivateRouteOrganization({ children }) {
  const { organization } = useContext(OrganizationAuthContext); 

  return organization ? children : <Navigate to="/login/organization" />;
}


const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children: [ 
      
      { 
        path: "/dashboard/user", 
        element: (
          <PrivateRouteUser>
              <Dashboard />
          </PrivateRouteUser>
        ),
      },
      
      { 
        path: "/map", 
        element: 
        (
          <PrivateRouteUser>
              <Map/> 
          </PrivateRouteUser>
        ),
      },

      {
        path: "/inventories",
        element: 
        (
          <PrivateRouteUser>
              <Inventories/>
          </PrivateRouteUser>
        ),
      },
      { 
        path: "/history",
        element: 
        (
          <PrivateRouteUser>
              <History/> 
          </PrivateRouteUser>
        ),
      },
      {
        path: "/editprofile",
        element: 
        (
          <PrivateRouteUser>
              <EditProfile/>
          </PrivateRouteUser>
        ),
      }
    ],
  },
  {
    path: "/",
    element:<OrganizationLayout/>,
    children: [ 
      { 
        path: "/dashboard/organization", 
        element: 
          <PrivateRouteOrganization>
              <DashboardOrganization/>
          </PrivateRouteOrganization>
      },
      { 
        path: "/donations", 
        element: 
          <PrivateRouteOrganization>
              <DonationsInfo/> 
          </PrivateRouteOrganization>
      },
      { 
        path: "/inventory", 
        element: 
          <PrivateRouteOrganization>
              <Inventory/> 
          </PrivateRouteOrganization>
      },
      { 
        path: "/pending", 
        element: 
          <PrivateRouteOrganization>
              <Pending/> 
          </PrivateRouteOrganization>
      },
      {
        path: "/editprofileorg",
        element: 
        (
          <PrivateRouteOrganization>
              <EditProfileOrg/>
          </PrivateRouteOrganization>
        ),
      }
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
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
    );
}



export default App;
