import Web3 from "web3";
import contractABI from "./abi/abi.json"; // Adjust the path if needed
import { useState } from "react";

// Set up web3 instance
const web3 = new Web3(window.ethereum);

// Contract address and instance
const contractAddress = "0x33b21cf57e74aa124947341915f6e2d2214125e9"; // Replace with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Helper function to store teacher metadata in the contract
export const handleStoreMetadata = async (name, description, ipfsLink) => {
  if (!web3.utils.isAddress(contractAddress)) {
    throw new Error("Invalid contract address");
  }

  const accounts = await web3.eth.requestAccounts();
  if (accounts.length === 0) {
    throw new Error("Please connect your wallet");
  }

  const userAddress = accounts[0];

  try {
    // Call the smart contract to store the metadata
    const response = await contract.methods
      .addTeacherMetadata(name, description, ipfsLink)
      .send({ from: userAddress });

    console.log("Metadata stored in contract:", response);
    return response;
  } catch (error) {
    console.error("Error storing metadata:", error);
    throw new Error("Error storing metadata in the contract.");
  }
};

// Helper function to retrieve teacher metadata from the contract
export const handleGetMetadata = async (name) => {
  try {
    const teacherMetadata = await contract.methods
      .getTeacherMetadata(name)
      .call();
    return teacherMetadata;
  } catch (error) {
    console.error("Error retrieving metadata:", error);
    throw new Error("Error retrieving metadata from the contract.");
  }
};