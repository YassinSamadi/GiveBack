import React from 'react';
import '../style/login.scss';
import '../style/App.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';


export const Register = () => {
  const [inputs, setInputs] = React.useState({ 
    email: '', 
    password: '' 
  });

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", inputs);
      console.log(res);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder="Email" name="email" onChange={handleChange}/>
        <input required type="password" placeholder="Password" name="password"  onChange={handleChange}/>
        <button onClick={handleSubmit} type="submit">Register</button>
        {/* <span><Link to="/register">Forgot Password?</Link></span> */}
        <p>Error!</p>
        <span>Do you already have an account?<Link to="/login">Log in</Link></span>
      </form>
    </div>
  )
}

export default Register
