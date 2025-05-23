// Import ethers from Hardhat
const { ethers } = require("hardhat");

async function main() {
  // Get the deployer's account
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Try to retrieve the account balance
  try {
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  } catch (error) {
    console.error("Error fetching balance:", error);
  }

  // Deploy the Minted contract
  const Minted = await ethers.getContractFactory("Minted");
  const minted = await Minted.deploy();

  // Wait for deployment to complete
  await minted.deployed();

  console.log("Contract deployed to:", minted.address);
}

// Run the script and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
