import Web3 from "web3";
import contractABI from "./abi/abi.json"; // Adjust the path if needed
import { useState } from "react";

<<<<<<< HEAD
// Set up web3 instance
const web3 = new Web3(window.ethereum);
=======
const CONTRACT_ADDRESS = "0xE8C42b0c182d31F06d938a97a969606A7731fFda"; // Replace with your contract address
const PINATA_API_KEY = "ba943b167d821f1de695";
const PINATA_SECRET_KEY =
  "86eeb88f5c80cd00ca3d14945e2d4eecd0454938752711a5f65564dfb38fc84f";
const PINATA_ENDPOINT = "https://api.pinata.cloud/pinning/pinFileToIPFS";
>>>>>>> ba3deab142e3941392c87aa3feb422e9b2818507

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
<<<<<<< HEAD
    const teacherMetadata = await contract.methods
      .getTeacherMetadata(name)
      .call();
    return teacherMetadata;
  } catch (error) {
    console.error("Error retrieving metadata:", error);
    throw new Error("Error retrieving metadata from the contract.");
=======
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    console.log("Using sender account:", sender);
    console.log("Submitting IPFS hash to contract:", ipfsHash);

    const gasEstimate = await contract.methods.submitProposal(ipfsHash).estimateGas({ from: sender });
    console.log("Estimated gas for transaction:", gasEstimate);

    await contract.methods.submitProposal(ipfsHash).send({ from: sender });
    console.log("Proposal submitted successfully.");
  } catch (error) {
    console.error("Error during proposal submission:", error);
    throw error;
  }
};


export const acceptProposal = async (teacherAddress) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    await contract.methods
      .acceptProposal(teacherAddress)
      .send({ from: sender });
    console.log("Proposal accepted successfully.");
  } catch (error) {
    console.error("Error accepting proposal:", error);
    throw error;
  }
};

export const rejectProposal = async (teacherAddress) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    await contract.methods
      .rejectProposal(teacherAddress)
      .send({ from: sender });
    console.log("Proposal rejected successfully.");
  } catch (error) {
    console.error("Error rejecting proposal:", error);
    throw error;
  }
};

export const getTeacherDetails = async (teacherAddress) => {
  try {
    console.log("Fetching teacher details for address:", teacherAddress);

    // Ensure the address is valid
    if (!web3.utils.isAddress(teacherAddress)) {
      throw new Error("Invalid Ethereum address");
    }

    // Call the smart contract
    const teacher = await contract.methods.teachers(teacherAddress).call();

    // Check if the teacher is registered
    if (!teacher.isRegistered) {
      throw new Error("Teacher is not registered in the contract");
    }

    // Log and return teacher details
    console.log("Teacher details:", teacher);
    return teacher;
  } catch (error) {
    console.error("Error fetching teacher details:", error.message || error);
    throw error;
>>>>>>> ba3deab142e3941392c87aa3feb422e9b2818507
  }
};

