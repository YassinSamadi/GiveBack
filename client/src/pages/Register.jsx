import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/GiveBackNoText500x500.png';

export const Register = () => {
  const [inputs, setInputs] = useState({
    first_name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [inNeed, setInNeed] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    if (e.target.name === 'profile_pic') {
      setProfilePic(e.target.files[0]);
    } else if (e.target.name === 'inNeed') {
      const inNeedValue = e.target.checked;
      setInNeed(inNeedValue);
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
    try {
     
  if (profilePic) {
        const uniqueProfilePicName = generateUniqueFilename(profilePic.name);
        const formData = new FormData();
        
        formData.append('profile_pic', profilePic, uniqueProfilePicName);
        formData.append('inNeed', inNeed);

        const imageResponse = await axios.post('/upload/profilepic', formData);
        const imageName = imageResponse.data.filename;

        await axios.post('/auth/register', {
          first_name: inputs.first_name,
          email: inputs.email,
          password: inputs.password,
          profile_pic: imageName,
          inNeed: inNeed,
        });
    }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("An error occurred."); 
      }
    }
  };

  return (
    <div className='auth splitscreen'>
      <div className='left'></div>
      <div className='right'>
        <img src={logo} alt='Logo' width={120} height={120} />
        <form>
          <input required type='text' placeholder='Name' name='first_name' onChange={handleChange} />
          <input required type='text' placeholder='Email' name='email' onChange={handleChange} />
          <input required type='password' placeholder='Password' name='password' onChange={handleChange} />
          <input type='file' accept='.jpg, .jpeg, .png' name='profile_pic' onChange={handleChange} />
          <input
            type='checkbox'
            name='inNeed'
            onChange={handleChange}
          />
          <label htmlFor='inNeed'>I am in need</label>
          <button onClick={handleSubmit} type='submit'>Register</button>
          {error && <p>{error.message || "An error occurred."}</p>}

          <span>Do you already have an account?<Link to='/login'>Log in</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Register;
