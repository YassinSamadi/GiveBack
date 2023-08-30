import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFound from '../assets/miscellaneous/404.png';
import '../style/notFound.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <div className='container-not-found'>
        <div>
          <img src={notFound} className='img-not-found' alt='Not Found' />
        </div>
        <div>
          <button onClick={redirectToHome} className='button-not-found'>
            Go back to the home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
