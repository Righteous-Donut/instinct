import { Web3Storage } from 'web3.storage';
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

// === Web3.Storage ===

function getAccessToken() {
  return process.env.REACT_APP_WEB3STORAGE_TOKEN;
}

const createWeb3StorageClient = () => {
  return new Web3Storage({ token: getAccessToken() });
};

const uploadFiles = async (files) => {
  try {
    if (!files || files.length === 0) throw new Error('No files provided for upload');
    const client = createWeb3StorageClient();
    const cid = await client.put(files, { wrapWithDirectory: false });
    return cid;
  } catch (error) {
    console.error('Failed to upload files:', error);
    throw error;
  }
};

const makeFileObjects = (fileName, fileData) => {
  try {
    if (!fileName || !fileData) throw new Error('Invalid file name or data');
    const blob = new Blob([fileData], { type: 'application/json' });
    return [new File([blob], `${fileName}.json`)];
  } catch (error) {
    console.error('Error creating file objects:', error);
    throw error;
  }
};

// === Wagmi v2 + RainbowKit Setup ===

const chains = [mainnet, sepolia];

const { connectors } = getDefaultWallets({
  appName: 'My DApp',
  projectId: 'no-qr-needed',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
  chains
});

export { uploadFiles, makeFileObjects, wagmiConfig, chains };
