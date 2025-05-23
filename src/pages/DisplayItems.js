import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../components/abi';
import { contractAddress } from '../components/Address';
import '../styles/DisplayItems.css';

const DisplayItems = () => {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        const totalSupply = await contract.totalSupply();
        const fetchedItems = [];

        for (let i = 0; i < totalSupply; i++) {
          const tokenURI = await contract.tokenURI(i);
          const response = await fetch(tokenURI);
          const metadata = await response.json();
          fetchedItems.push(metadata);
        }

        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        const message = error?.reason || error?.message || 'Unknown error';
        setErrorMessage(`Error fetching: ${message}`);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="displayContainer">
      <h2>Display Items</h2>
      {errorMessage && (
        <div style={{
          maxWidth: '90%',
          maxHeight: '100px',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          color: 'red',
          backgroundColor: '#ffeeee',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          {errorMessage}
        </div>
      )}
      <div className="nftGrid">
        {items.map((item, index) => (
          <div className="nftCard" key={index}>
            <img src={item.image} alt={item.name} className="nftImage" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItems;
