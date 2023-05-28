import React from 'react';
import '../style/login.scss';
import '../style/App.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [inputs, setInputs] = React.useState({ 
    email: '', 
    password: '' 
  });

  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    }
    catch (error) {
      setError(error.response.data);
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
        {error && <p>{error}</p>}
        <span>Do you already have an account?<Link to="/login">Log in</Link></span>
      </form>
    </div>
  )
}

export default Register
