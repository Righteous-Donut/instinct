import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, hardhat } from 'wagmi/chains'; // Import hardhat
import { createPublicClient } from 'viem';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const chains = [mainnet, sepolia, hardhat]; 

const { connectors } = getDefaultWallets({
  appName: 'Instinct',
  projectId: process.env.REACT_APP_REOWN_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: createPublicClient({
    chain: hardhat, 
    transport: http(),
  }),
  chains,
});

export { wagmiConfig, chains };
