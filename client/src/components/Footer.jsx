import React from 'react'
import xLogo from '../assets/miscellaneous/xlogo.png'
import facebookLogo from '../assets/miscellaneous/facebooklogo.png'
import instagramLogo from '../assets/miscellaneous/instagramlogo.png'

import '../style/footer.scss'

export const Footer = () => {
  return (
    <div>
        <svg viewBox="0 -20 700 110" width="100%" height="110" preserveAspectRatio="none">
          <path transform="translate(0, -20)" d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700" fill="#90C088" />
          <path d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z" fill="#90C088" />
        </svg>
        <div className='container-footer'>
          <div>
          </div>
          <div className='container-socialmedia'>
            <div>
              <h3 className='follow-us'>Follow us</h3>
            </div>
            <div className='icon-placement'>
              <div  className='image-div'>
                <img src={facebookLogo} alt="logo" className='image-size' />
              </div>
              <div  className='image-div'>
                <img src={instagramLogo} alt="logo" className='image-size' />
              </div>
              <div  className='image-div'>
                <img src={xLogo} alt="logo" className='image-size'/>
              </div>
            </div>
          </div>
          <div className='name-container'>
            <p className='text-color'>
              <strong>Made by Yassin</strong>
            </p>
          </div>
        </div>
    </div>
  )
}

export default Footer
