import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/CreateNFT.js'; 
import Hero from '../assets/hero.png'
import Background from '../assets/background.png'
import '../styles/RightMain.css';
import '../styles/Background.css';
import { Container } from 'react-bootstrap';



const RightMain = () => {
  return (
    <div className="right-main-container">
      <div className="background-container">
        <img src={Background} alt="background" className="background" />
      </div>
      <div className="hero-container">
        <img src={Hero} alt="hero" className="hero" />
      </div>
      <div className="create-btn-container">
        <button className="create-btn">
          <a href="/create-nfts/form">Create NFTs</a>
        </button>
        <button className="explore-btn">
          <a href="https://opensea.io" target="_blank" rel="noopener noreferrer">
            Explore
          </a>
        </button>
      </div>
    </div>
  );
};

export default RightMain;
