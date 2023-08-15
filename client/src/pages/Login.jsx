import React from 'react';
import '../style/login.scss';
<<<<<<< Updated upstream
=======
import '../style/App.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import logo from '../assets/logo/GiveBackNoText500x500.png';
>>>>>>> Stashed changes

export const Login = () => {
  return (
<<<<<<< Updated upstream
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
=======
    <div className='auth splitscreen'>
      <div className='left'></div>
      <div className='right'>
      <img
          src={logo}
          alt="Logo"
          width={120}
          height={120}
        />
        <form>
          <input required type="text" placeholder="Email" name="email" onChange={handleChange}/>
          <input required type="password" placeholder="Password" name="password" onChange={handleChange}/>
          <button onClick={handleSubmit} type="submit">Login</button>
          {/* <span><Link to="/register">Forgot Password?</Link></span> */}
          {error && <p>{error}</p>}
          <span>Don't have an account?<Link to="/register">Sign up</Link></span>
        </form>
      </div>
>>>>>>> Stashed changes
    </div>


  )
}

export default Login
