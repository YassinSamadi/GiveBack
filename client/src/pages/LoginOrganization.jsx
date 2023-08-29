
import { OrganizationAuthContext } from '../context/authContextOrganizations';
import React, { useContext } from 'react';
import '../style/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo/GiveBackNoText500x500.png';


export const LoginOrganization = () => {
    const [inputs, setInputs] = useState({ 
      email: '', 
      password: '' 
    });
  
    const [error, setError] = React.useState(null);
  
    const navigate = useNavigate();
  
    const {login} = useContext(OrganizationAuthContext);
  
    const handleChange = e => {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
  
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        await login(inputs)
        navigate("/dashboard/organization");
      }
      catch (error) {
        setError(error.response.data);
      }
    }
    return (
      <div className='auth splitscreen'>
      <div className='left'></div>
      <div className='right'>
      <img
          src={logo}
          alt="Logo"
          width={120}
          height={120}
        />
        <h1>Login as an organization</h1>
        <form>
          <input required type="text" placeholder="Email" name="email" onChange={handleChange}/>
          <input required type="password" placeholder="Password" name="password" onChange={handleChange}/>
          <button onClick={handleSubmit} type="submit">Login</button>
          {error && <p>{error}</p>}
          <span>Don't have an account?<Link to="/register/organization">Sign up</Link></span>
        </form>
      </div>
      </div>

    )
  }
  
  export default LoginOrganization
  
