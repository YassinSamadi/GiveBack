import React from 'react';
import '../style/login.scss';
import '../style/App.scss';
import { Link } from 'react-router-dom';



export const Register = () => {

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder="Email" />
        <input required type="password" placeholder="Password" />
        <button type="submit">Register</button>
        {/* <span><Link to="/register">Forgot Password?</Link></span> */}
        <p>Error!</p>
        <span>Do you already have an account?<Link to="/login">Log in</Link></span>
      </form>
    </div>
  )
}

export default Register
