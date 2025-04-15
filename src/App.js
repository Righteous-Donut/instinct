import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ethers } from 'ethers';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Web3 from 'web3';

// Lazy loading components
const CreateNFT = lazy(() => import('./pages/CreateNFT'));
const CreateNFTForm = lazy(() => import('./components/CreateNFTForm'));
const Introbar = lazy(() => import('./components/Introbar'));
const RightMain = lazy(() => import('./components/RightMain'));
const LeftMain = lazy(() => import('./components/LeftMain'));

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);

          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0] || '');
          });
        } catch (error) {
          console.error('Error connecting to wallet:', error);
        }
      } else {
        console.log('No Ethereum browser extension detected.');
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Introbar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <LeftMain />
                  <RightMain />
                </div>
              }
            />
            <Route path="/create-nfts/form" element={<CreateNFTForm />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
