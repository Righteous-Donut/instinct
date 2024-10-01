import React from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import CreateNFT from './pages/CreateNFT';
import CreateNFTForm from './components/CreateNFTForm';
import Introbar from './components/Introbar'; 
import RightMain from './components/RightMain'; 
import LeftMain from './components/LeftMain';  // Add LeftMain if needed

function App() {
  return (
    <div className="App">
      {/* Introbar appears at the top */}
      <Introbar />
      
      {/* Add other components below */}
      <div className="main-content">
        <Routes>
          {/* Define the default route */}
          <Route path="/" element={
            <div>
              <LeftMain />  {/* Left-hand side content */}
              <RightMain /> {/* Right-hand side content */}
            </div>
          } />
          
          {/* Define the create-nft form route */}
          <Route path="/create-nfts/form" element={<CreateNFTForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
