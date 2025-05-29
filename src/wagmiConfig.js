import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, hardhat } from 'wagmi/chains'; 
import { createPublicClient } from 'viem';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const chains = [mainnet, sepolia, hardhat]; 

const { connectors } = getDefaultWallets({
  appName: 'Instinct',
  projectId: process.env.REACT_APP_PINATA_JWT,
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
