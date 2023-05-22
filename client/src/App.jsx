import {createBrowserRouter, RouterProvider,Route, Outlet,} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import './style/App.scss';

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
        path: "/", 
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
    path: "/",
    element: <App />,
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
