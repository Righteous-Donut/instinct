require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config(); 


const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not defined in your .env file");
}


module.exports = {
  solidity: "0.8.17",
  networks: {
    // Localhost Network
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337, // Hardhat localhost default chain ID
    },
    
    // Mainnet
    mainnet: {
      url: "https://rpc.nodeflare.app/eth/public",
      accounts: [PRIVATE_KEY],
      chainId: 1,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, //verification on Etherscan
  },
};
