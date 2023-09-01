import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import '../style/login.scss';
import logo from '../assets/logo/GiveBackNoText500x500.png';

export const RegisterOrganization = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    street: '',
    number: '',
    city: '',
    country: '',
    postal_code: '',
    isOrganization: 1,
  });

  const [logoFile, setLogoFile] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    if (e.target.name === 'logo') {
      setLogoFile(e.target.files[0]);
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const generateUniqueFilename = originalFilename => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = originalFilename.split('.').pop();
    return `${timestamp}-${randomString}.${extension}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null); 

    const requiredFields = ['name', 'email', 'password', 'street', 'number', 'city', 'country', 'postal_code'];
    const missingFields = requiredFields.filter(field => !inputs[field]);
  
    if (missingFields.length > 0) {
      setError(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }
  
    if (inputs.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(inputs.street)) {
      setError('Street must contain only text characters');
      return;
    }
    if (!/^\d+$/.test(inputs.number)) {
      setError('Number must be a valid number');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(inputs.city)) {
      setError('City must contain only text characters');
      return;
    }
    if (!/^\d+$/.test(inputs.postal_code)) {
      setError('Postal Code must be a valid number');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(inputs.country)) {
      setError('Country must contain only text characters');
      return;
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(inputs.email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    try {
      const addressResponse = await axios.post('/address/register', {
        street: inputs.street,
        number: inputs.number,
        city: inputs.city,
        country: inputs.country,
        postal_code: inputs.postal_code,
        isOrganization: 1,
      });
  
      const addressId = addressResponse.data.id;
  
      if (logoFile) {
        const uniqueLogoName = generateUniqueFilename(logoFile.name);
  
        const formData = new FormData();
        formData.append('logo', logoFile, uniqueLogoName);
        const logoResponse = await axios.post('/upload/logo', formData);
        const logoName = logoResponse.data.filename;
  
        await axios.post('/authorganizations/registerOrganization', {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          address_id: addressId,
          logo: logoName,
        });
      }
  
      navigate('/login/organization');
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };
  

  return (
    <div className='auth splitscreen'>
      <div className='left'></div>
      <div className='right'>
        <img src={logo} alt='Logo' width={120} height={120} />
        <h1>Register as an organization</h1>
        <form>
          <input required type='text' placeholder='Organization Name' name='name' onChange={handleChange} />
          <input required type='text' placeholder='Email' name='email' onChange={handleChange} />
          <input required type='password' placeholder='Password' name='password' onChange={handleChange} />
          <input required type='text' placeholder='Street' name='street' onChange={handleChange} />
          <input required type='text' placeholder='Number' name='number' onChange={handleChange} />
          <input required type='text' placeholder='City' name='city' onChange={handleChange} />
          <input required type='text' placeholder='Country' name='country' onChange={handleChange} />
          <input required type='text' placeholder='Postal Code' name='postal_code' onChange={handleChange} />
          <input type='file' accept='.jpg, .jpeg, .png' name='logo' onChange={handleChange} />
          <button onClick={handleSubmit} type='submit'>Register</button>
          {error && <p className="error-message">{error}</p>}
          <span>Do you already have an account?<Link to='/login/organization'>Log in</Link></span>
        </form>
      </div>
    </div>
  );
};

export default RegisterOrganization;
