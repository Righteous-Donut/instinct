import React from 'react';
import '../styles/Navbar.css';
import logo from '../assets/minted-logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNetwork } from 'wagmi';

const Navbar = () => {
  const { chain } = useNetwork();

  return (
    <div className='container'>
      <div className="logo">
        <img className='logo-image' src={logo} alt="minted Logo" />
      </div>
      {chain?.id === 11155111 && (
        <a href="https://access.rockx.com/faucet-sepolia" target="_blank" rel="noopener noreferrer">
          <button className='faucet'>Testnet Faucet</button>
        </a>
      )}
      <div className="connectBtnContainer">
        <ConnectButton 
          chainStatus="none"
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
