import React from 'react';
import '../styles/Introbar.css';
import logo from '../assets/minted-logo.png';
import icon from '../assets/icon.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useChainId } from 'wagmi';

const Introbar = () => {
  const chainId = useChainId();

  return (
    <div className='Container'>
    	<div className="logo-section">
	      <div className="icon">
	        <img className='icon' src={icon} alt="icon" />
	      </div>
	      <div className="Logo">
	        <img className='logo-image' src={logo} alt="minted Logo" />
	      </div>
	    </div>
	      {chainId === 11155111 && (
	        <a
	          href="https://sepoliafaucet.com"
	          target="_blank"
	          rel="noopener noreferrer"
	          className="faucet-button"
	        >
	          Faucet
	        </a>
	      )}
	      <ConnectButton />
	    </div>
  	);
};

export default Introbar;
