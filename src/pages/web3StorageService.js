import axios from 'axios';

const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

if (!PINATA_JWT) {
  throw new Error('Missing Pinata JWT. Set REACT_APP_PINATA_JWT in your .env');
}

const pinataBaseURL = 'https://api.pinata.cloud/pinning';

const uploadJSONToPinata = async (metadata) => {
  try {
    const res = await axios.post(`${pinataBaseURL}/pinJSONToIPFS`, metadata, {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data.IpfsHash;
  } catch (error) {
    console.error('Failed to upload JSON to Pinata:', error);
    throw error;
  }
};

const uploadFileToPinata = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(`${pinataBaseURL}/pinFileToIPFS`, formData, {
      maxContentLength: Infinity,
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.IpfsHash;
  } catch (error) {
    console.error('Failed to upload file to Pinata:', error);
    throw error;
  }
};

export { uploadJSONToPinata, uploadFileToPinata };
