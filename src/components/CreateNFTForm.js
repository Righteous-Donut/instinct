import React, { useState } from 'react';
import '../styles/CreateNFT.css';
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { parseUnits } from "@ethersproject/units";
import { abi } from "../components/abi";
import { uploadFiles } from '../pages/web3StorageService';
import '../styles/Navbar.css';

const CreateNFTForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [finalCid, setFinalCid] = useState(null);
  const [flip, setFlip] = useState(false);
  const [data, setData] = useState({ name: "", description: "", units: "" });

  async function makeFileObjects() {
    try {
      const image = selectedImage;
      const media = selectedMedia;
      const files = [
        new File([image], "image.png", { type: "image/png" }),
        new File([media], "media.mp4", { type: "video/mp4" })
      ];

      const cid = await uploadFiles(files);

      const metadata = {
        name: data.name,
        description: data.description,
        image: `ipfs://${cid}/image.png`,
        animation_url: `ipfs://${cid}/media.mp4`
      };

      const metadataFile = new File([JSON.stringify(metadata)], "metadata.json", { type: "application/json" });

      const metadataCid = await uploadFiles([metadataFile]);
      setFinalCid(`ipfs://${metadataCid}/metadata.json`);
    } catch (error) {
      console.error('Error in makeFileObjects:', error);
    }
  }

  async function mintNFT() {
    try {
      // Ensure metadata CID is ready
      if (!finalCid) {
        await makeFileObjects();
      }

      // Connect to Ethereum provider and get signer
      const provider = new Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // Define the smart contract details
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
      const contract = new Contract(contractAddress, abi, signer);

      // Calculate the total cost based on the number of NFTs
      const costFromContract = await contract.cost();
      const totalCost = costFromContract.mul(data.units);

      // Create transaction object
      const transaction = {
        from: accounts[0],
        value: totalCost.toString(),
        gasLimit: 1000000,
      };

      // Mint the NFTs
      const tx = await contract.mint(data.units, finalCid, transaction);
      console.log(tx);
    } catch (error) {
      console.error('Error minting file:', error);
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlip(true);
    try {
      await makeFileObjects(); // Ensure files are uploaded before trying to mint
      await mintNFT(); // Call the mint function after files are ready
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };


  return (
    <div className='create-container'>
      <h3>Mint your NFTs below</h3>
      <div className="containerMain">
        <div className="left">
          <p className="title">Create your NFTs</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="NFT Name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="NFT Description"
              name="description"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Number of NFTs to Mint"
              name="units"
              onChange={handleChange}
            />
            <p>Display image</p>
            <input
              type="file"
              id="imageFile"
              name="myImage"
              accept="image/*"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
            <p>Media File</p>
            <input
              type="file"
              name="myMedia"
              accept="video/*"
              onChange={(event) => {
                setSelectedMedia(event.target.files[0]);
              }}
            />
            <button
              id="BtnColor"
              className='submit'
              type="submit"
            >
              Submit 
            </button>
          </form>
        </div>

        <div className="right">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                {/* Front content */}
              </div>
              <div className="flip-card-back">
                {flip && (
                  <div className="front">
                    <p className="title">{data.name}</p>
                    <p className='description'>{data.description}</p>
                    <p>{data.units} x NFTs</p>
                    {selectedImage && (
                      <img 
                        alt="not found"
                        width={"180px"}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    )}
                    <br />
                    <button onClick={() => setSelectedImage(null)}>
                      Remove
                    </button>

                    {selectedMedia && (
                      <div className="media">
                        <p>Media File</p>
                        <p>{selectedMedia.name}</p>
                      </div>
                    )}

                    <div>
                      <button onClick={mintNFT}>Mint</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFTForm;
