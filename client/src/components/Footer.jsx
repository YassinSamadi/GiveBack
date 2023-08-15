import React from 'react'
import xLogo from '../assets/miscellaneous/xlogo.png'
import facebookLogo from '../assets/miscellaneous/facebooklogo.png'
import instagramLogo from '../assets/miscellaneous/instagramlogo.png'

export const Footer = () => {
  return (
    <div>
        <svg viewBox="0 -20 700 110" width="100%" height="110" preserveAspectRatio="none">
          <path transform="translate(0, -20)" d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700" fill="#90C088" />
          <path d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z" fill="#90C088" />
        </svg>
        <div style={{backgroundColor:'#90C088', height:"200px", marginTop:"-40px"}}>
          <div>

          </div>
          <div style={{display: "grid", justifyContent:"center", flexDirection:"row"}}>
            <div>
              <h3 style={{color:"#32632A", textAlign:"center"}}>Follow us</h3>
            </div>
            <div style={{display: "flex", flexDirection:"row"}}>
              <div style={{marginRight:"5px", backgroundColor:"#32632A", borderRadius:"50%", height:"60px", width:"60px", display	:"flex", justifyContent:"center",alignItems:"center"}}>
                <img src={facebookLogo} alt="logo" style={{width:"30px", height:"30px"}} />
              </div>
              <div style={{marginRight:"5px", backgroundColor:"#32632A", borderRadius:"50%", height:"60px", width:"60px", display	:"flex", justifyContent:"center",alignItems:"center"}}>
                <img src={instagramLogo} alt="logo" style={{width:"30px", height:"30px"}} />
              </div>
              <div style={{backgroundColor:"#32632A", borderRadius:"50%", height:"60px", width:"60px", display	:"flex", justifyContent:"center",alignItems:"center"}}>
                <img src={xLogo} alt="logo" style={{width:"30px", height:"30px"}}/>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p style={{ color: "#32632A" }}>
              <strong>Made by Yassin</strong>
            </p>
          </div>
        </div>
    </div>
  )
}

export default Footer
