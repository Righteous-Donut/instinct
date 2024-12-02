import { Web3Storage } from 'web3.storage';

// Fetch API token and DID key from environment variables
function getAccessToken() {
    return process.env.REACT_APP_WEB3STORAGE_TOKEN; // Web3.Storage token
}

function getDidKey() {
    return process.env.REACT_APP_DID_KEY; // DID key
}

// Create a Web3Storage client with Web3.Storage token
const createConfig = () => {
    return new Web3Storage({ token: getAccessToken() });
};

// Create file objects to be uploaded
export const makeFileObjects = (fileName, fileData) => {
    const blob = new Blob([fileData], { type: 'application/json' });
    const files = [
        new File([blob], `${fileName}.json`)
    ];
    return files;
};

// Upload files using the Web3.Storage API
export const uploadFiles = async (files) => {
    try {
        const client = createConfig();
        const cid = await client.put(files, {
            wrapWithDirectory: false, // Optional: prevents wrapping in a directory
        });
        console.log('Stored files with CID:', cid);
        return cid;
    } catch (error) {
        console.error('Failed to upload files:', error);
    }
};

// Function to mint NFT (mocked version, adjust it to your NFT smart contract logic)
export const mintNFT = async (cid, contract) => {
    try {
        console.log('Minting NFT with CID:', cid);
        const tx = await contract.mintNFT(cid);
        await tx.wait();
        console.log('NFT minted successfully');
    } catch (error) {
        console.error('Failed to mint NFT:', error);
    }
};
