import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LeftMain.css';
import title from '../assets/title.png';
import Black from '../assets/Black.png'


const LeftMain = () => {
  const [createNFTs, setCreateNFTs] = useState(false);
  const navigate = useNavigate();


  return (
    <div className='section'> 
      <div className="left-main-container">
        <div className="Black">
          <img src={Black} alt="black" className="Black" />
        </div>
        <p className='left-text'>Become the Ultimate NFT Champion and Mint your Collection </p> 
        <p className='types'>Step into the future with Project Instinct and join the NFT revolution. Mint your choice of Ebooks, Art, Music, Podcasts, Courses ... Any digital file!</p>
      </div>
    </div>
  );
};

export default LeftMain;
 