import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { BrowserRouter } from 'react-router-dom';

// Define the Ethereum mainnet
const mainnetChain = {
  id: 1,
  name: 'Ethereum Mainnet',
  network: 'mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://ethereum-rpc.publicnode.com',
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
  testnet: false,
};

// Define the Sepolia testnet
const sepoliaChain = {
  id: 11155111,
  name: 'Sepolia Testnet',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia ETH',
    symbol: 'SepoliaETH',
  },
  rpcUrls: {
    default: 'https://rpc.sepolia.org',
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
};

// Define the Hardhat testnet
const hardhatChain = {
  id: 31337,
  name: 'Hardhat Localhost',
  network: 'hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'http://127.0.0.1:8545',
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'http://localhost:8545' },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [mainnetChain, sepoliaChain, hardhatChain], 
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      theme={lightTheme({
        accentColor: '#ff2c2c',
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
      })}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>
);

reportWebVitals();
