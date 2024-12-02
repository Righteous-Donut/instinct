require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();


const PRIVATE_KEY = process.env.PRIVATE_KEY || "your-wallet-private-key";

module.exports = {
  solidity: "0.8.17",
  networks: {
    // Localhost Network
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337, // Hardhat localhost default chain ID
    },
    
    // Sepolia Testnet
    sepolia: {
      url: "https://rpc.sepolia.org", // Public RPC URL for Sepolia
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    
    // Mainnet
    mainnet: {
      url: "https://mainnet.infura.io/v3/",
      accounts: [PRIVATE_KEY],
      chainId: 1,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // If you need verification functionality on Etherscan
  },
};
