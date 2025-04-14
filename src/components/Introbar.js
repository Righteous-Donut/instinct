import React from 'react';
import '../styles/Introbar.css';
import logo from '../assets/minted-logo.png';
import icon from '../assets/icon.png';

const Introbar = () => {
	return (
	    <div className='Container'>
		  <div className="icon">
		    <img className='icon' src={icon} alt="icon" />
		  </div>
		  <div className="Logo">
		    <img className='logo-image' src={logo} alt="minted Logo" />
		  </div>
		</div>

	);
}

export default Introbar;

