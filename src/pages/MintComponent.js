import React, { useState } from 'react';
import { uploadFiles } from './web3StorageService';

function MintComponent() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleMint = async () => {
    if (file) {
      try {
        // uploadFiles expects an array of files
        const cid = await uploadFiles([file]);
        console.log('Minted with CID:', cid);
        setMessage(`Minted successfully with CID: ${cid}`);
      } catch (error) {
        console.error('Error minting file:', error);
        setMessage('Error minting file');
      }
    } else {
      console.error('No file selected');
      setMessage('Please select a file to mint');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleMint}>Mint</button>
      <p>{message}</p>
    </div>
  );
}

export default MintComponent;
