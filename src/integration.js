import Web3 from "web3";
import axios from "axios";
import abi from "./abi/abi.json";

const CONTRACT_ADDRESS = "0xE8C42b0c182d31F06d938a97a969606A7731fFda"; // Replace with your contract address
const PINATA_API_KEY = "ba943b167d821f1de695";
const PINATA_SECRET_KEY =
  "86eeb88f5c80cd00ca3d14945e2d4eecd0454938752711a5f65564dfb38fc84f";
const PINATA_ENDPOINT = "https://api.pinata.cloud/pinning/pinFileToIPFS";

let web3;
let contract;

export const initializeWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    console.log("Web3 initialized and contract loaded.");
  } else {
    console.error("Please install MetaMask.");
  }
};

export const uploadToPinata = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(PINATA_ENDPOINT, formData, {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });
    console.log("File uploaded to Pinata:", response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw error;
  }
};

export const submitProposal = async (ipfsHash) => {
  try {
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
  }
};

