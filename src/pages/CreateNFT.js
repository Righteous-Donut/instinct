import React from 'react';
import '../styles/App.css';
import Right from '../components/RightMain';
import Left from '../components/LeftMain';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/HomePage.css';
import '../styles/RightMain.css';
import '../styles/Background.css';
import '../styles/Black.css';
import '../styles/Navbar.css';
import '../styles/LeftMain.css';


function CreateNFT() {
    return (
    <div>
      <Navbar />
      <div className="create-nft-container">
        <Right />
        <Left />
      </div>
    </div>
  );
}



export default CreateNFT;
