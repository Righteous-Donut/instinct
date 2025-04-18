import React from 'react';
import '../styles/Navbar.css';
import logo from '../assets/minted-logo.png';
import icon from '../assets/icon.png'; 
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useChainId } from 'wagmi';

const Navbar = () => {

   return (
    <div className="navbar">
      <div className="logo-section">
        <img className="icon" src={icon} alt="icon" />
        <img className="logo-image" src={logo} alt="Instinct logo" />
      </div>
    </div>
  );
}

export default Navbar;
