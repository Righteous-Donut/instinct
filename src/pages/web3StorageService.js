import { Web3Storage } from 'web3.storage';

function getAccessToken() {
    return process.env.REACT_APP_WEB3STORAGE_TOKEN;
}

// Create a Web3Storage client
export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

// Upload files to Web3Storage
export async function uploadFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log('stored files with cid:', cid);
  return cid;
}

// Function to create file objects for uploading
export async function makeFileObjects(file) {
   // Use a new Blob with correct type handling, and adjust for new API
  const blob = new Blob([file], { type: file.type });
  const files = [
    new File([blob], file.name)
  ];
  return files;
}

// Function to mint an NFT
export async function mint(file) {
  try {
    const files = await makeFileObjects(file);
    const cid = await uploadFiles(files);
    return cid;
  } catch (error) {
    console.error('Error in minting:', error);
    throw error;
  }
}
