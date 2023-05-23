import React from 'react';
import '../style/login.scss';
import '../style/App.scss';
import { Link } from 'react-router-dom';



export const Login = () => {

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder="Email" />
        <input required type="password" placeholder="Password" />
        <button type="submit">Login</button>
        {/* <span><Link to="/register">Forgot Password?</Link></span> */}
        <p>Error!</p>
        <span>Don't have an account?<Link to="/register">Sign up</Link></span>
      </form>
    </div>
  )
}

export default Login
