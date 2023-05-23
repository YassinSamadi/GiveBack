import {createBrowserRouter, RouterProvider,Route, Outlet,} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import './style/App.scss';
import Dashboard from "./pages/Dashboard";

const Layout =() => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children: [ 
      { 
        path: "/home", 
        element: <Home/> 
      },
      { 
        path: "/dashboard", 
        element: <Dashboard/> 
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
