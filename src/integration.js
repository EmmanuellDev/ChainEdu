import { ethers } from "ethers";
import abi from "./abi/abi.json";

const contractAddress = "0xcb2217d45754c751abbafc036b1a5a1d45dba3a5";

// Store a message in the smart contract
export const storeMessage = async (message) => {
  if (!window.ethereum) throw new Error("MetaMask is not installed.");

  // Connect to Ethereum wallet
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Connect to the smart contract
  const contract = new ethers.Contract(contractAddress, abi, signer);

  // Call the storeMessage function
  const tx = await contract.storeMessage(message);
  await tx.wait(); // Wait for transaction confirmation
};

// Retrieve the stored message from the smart contract
export const retrieveMessage = async () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed.");

  // Connect to Ethereum wallet
  const provider = new ethers.BrowserProvider(window.ethereum);

  // Connect to the smart contract
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Call the retrieveMessage function
  return await contract.retrieveMessage();
};
