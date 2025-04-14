import React, { useState } from 'react';
import { uploadFileToPinata, uploadJSONToPinata } from '../pages/web3StorageService';
import { ethers } from 'ethers';
import { abi } from './abi';
import { contractAddress as address } from './Address';
import '../styles/CreateNFT.css';

const CreateNFTForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('');
  const [ipfsUrl, setIpfsUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading to Pinata...');
    setIpfsUrl(null);

    try {
      // Upload image file
      const imageCid = await uploadFileToPinata(image);
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageCid}`;

      // Create and upload metadata
      const metadata = {
        name,
        description,
        image: imageUrl,
      };
      const metadataCid = await uploadJSONToPinata(metadata);
      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadataCid}`;

      // Interact with smart contract
      setStatus('Minting NFT on blockchain...');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer);

      await contract.mint(1, metadataUrl, {
        value: ethers.utils.parseEther("0.01")
      });

      setStatus('NFT minted successfully!');
      setIpfsUrl(metadataUrl);
    } catch (error) {
      console.error('Error minting file:', error);
      setStatus(`Error minting file: ${error.message}`);
    }
  };

  const walletConnectProjectId = process.env.REACT_APP_REOWN_PROJECT_ID;
  console.log("WalletConnect Project ID:", walletConnectProjectId);

  return (
    <div className="form-layout">
      <form className="create-nft-form" onSubmit={handleSubmit}>
        <h2 className="mint-title">Create and Mint NFT</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Mint NFT</button>
        <p>{status}</p>
        {ipfsUrl && (
          <p>
            Metadata IPFS URL: <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">{ipfsUrl}</a>
          </p>
        )}
      </form>

      {imagePreview && (
        <div className="image-preview-wrapper">
          <img src={imagePreview} alt="Preview" className="image-preview" />
        </div>
      )}
    </div>
  );
};

export default CreateNFTForm;
