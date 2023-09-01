import { useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo/GiveBackNoText500x500.png';

export const Register = () => {
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [inNeed, setInNeed] = useState(false);

  const isValidEmail = email => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleChange = e => {
    let newError = null;
  
    if (e.target.name === 'profile_pic') {
      const selectedFile = e.target.files[0];
  
      if (selectedFile.size > 5 * 1024 * 1024) {
        newError = 'File size exceeds 5MB limit';
      } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(selectedFile.type)) {
        newError = 'Only JPG, JPEG, and PNG files are allowed';
      }
      setProfilePic(selectedFile);
    } else if (e.target.name === 'inNeed') {
      const inNeedValue = e.target.checked;
      setInNeed(inNeedValue);
    } else {
      if (
        (e.target.name === 'first_name' || e.target.name === 'last_name') &&
        /\d/.test(e.target.value)
      ) {
        newError = 'Names cannot contain numbers';
      }
  
      if (e.target.name === 'email' && !isValidEmail(e.target.value)) {
        newError = 'Invalid email format';
      } else if (e.target.name === 'password' && e.target.value.length < 6) {
        newError = 'Password must be at least 6 characters long';
      } else if ((e.target.name === 'first_name' || e.target.name === 'last_name') && e.target.value.length > 20) {
        newError = 'Max 20 characters allowed';
      }
    }
  
    setError(newError);
  
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  
  
  

  const generateUniqueFilename = originalFilename => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = originalFilename.split('.').pop();
    return `${timestamp}-${randomString}.${extension}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (error || !inputs.first_name || !inputs.last_name || !inputs.email || !inputs.password) {
      setError('Please fill in all required fields.');
      return;
    }
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
          last_name: inputs.last_name,
          email: inputs.email,
          password: inputs.password,
          profile_pic: imageName,
          inNeed: inNeed,
        });

        setError(null);

        window.location.href = '/login';
    }
    } catch (error) {
    if (error.response && error.response.data) {
      setError(error.response.data);
    } else {
      setError('An error occurred.');
    }
    }
  };

  return (
    <div className='auth splitscreen'>
      <div className='left'></div>
      <div className='right'>
        <img src={logo} alt='Logo' width={120} height={120} />
        <form>
          <input required maxLength={20} type='text' placeholder='First name' name='first_name' onChange={handleChange} />
          <input required maxLength={20} type='text' placeholder='Last name' name='last_name' onChange={handleChange} />
          <input required maxLength={40} type='text' placeholder='Email' name='email' onChange={handleChange} />
          <input required maxLength={100} type='password' placeholder='Password' name='password' onChange={handleChange} />
          <input type='file' accept='.jpg, .jpeg, .png' name='profile_pic' onChange={handleChange} />
          <input
            type='checkbox'
            name='inNeed'
            onChange={handleChange}
          />
          <label htmlFor='inNeed'>I am in need</label>
          <button onClick={handleSubmit} type='submit'>Register</button>
          {error && <p>{error}</p>}


          <span>Do you already have an account?<Link to='/login'>Log in</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Register;
