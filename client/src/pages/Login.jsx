import React, { useContext } from 'react';
import '../style/login.scss';
import '../style/App.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export const Login = () => {
  const [inputs, setInputs] = useState({ 
    email: '', 
    password: '' 
  });

  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);


  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/dashboard/user");
    }
    catch (error) {
      setError(error.response.data);
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder="Email" name="email" onChange={handleChange}/>
        <input required type="password" placeholder="Password" name="password" onChange={handleChange}/>
        <button onClick={handleSubmit} type="submit">Login</button>
        {/* <span><Link to="/register">Forgot Password?</Link></span> */}
        {error && <p>{error}</p>}
        <span>Don't have an account?<Link to="/register">Sign up</Link></span>
      </form>
    </div>
  )
}

export default Login
