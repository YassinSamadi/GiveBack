import React, { useState } from 'react';
import '../style/login.scss';
import '../style/App.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegisterOrganization = () => {
  const [inputs, setInputs] = useState({ 
    email: '', 
    password: '',
    street: '',
    number: '',
    city: '',
    country: '',
    postal_code: '',
    isOrganization: 1
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        const addressResponse = await axios.post("/address/register", {
            street: inputs.street,
            number: inputs.number,
            city: inputs.city,
            country: inputs.country,
            postal_code: inputs.postal_code,
            isOrganization: 1
        });
        
        const addressId = addressResponse.data.id;

        await axios.post("/authorganizations/registerOrganization", {
            email: inputs.email,
            password: inputs.password,
            address_id: addressId
        });

        navigate("/login/organization");
        }
        catch (error) {
        setError(error.response.data);
        }
  }

  return (
    <div className='auth'>
      <h1>Register as Organization</h1>
      <form>
        <input required type="text" placeholder="Email" name="email" onChange={handleChange}/>
        <input required type="password" placeholder="Password" name="password"  onChange={handleChange}/>
        <input required type="text" placeholder="Street" name="street"  onChange={handleChange}/>
        <input required type="text" placeholder="Number" name="number"  onChange={handleChange}/>
        <input required type="text" placeholder="City" name="city"  onChange={handleChange}/>
        <input required type="text" placeholder="Country" name="country"  onChange={handleChange}/>
        <input required type="text" placeholder="Postal Code" name="postal_code"  onChange={handleChange}/>
        <button onClick={handleSubmit} type="submit">Register</button>
        {error && <p>{JSON.stringify(error)}</p>}
        <span>Do you already have an account?<Link to="/login/organization">Log in</Link></span>
      </form>
    </div>
  )
}

export default RegisterOrganization;
