import React, { useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Teacher = () => {
  const [resume, setResume] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Pinata API details
  const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const pinataAPIKey = "ba943b167d821f1de695";
  const pinataAPISecret =
    "86eeb88f5c80cd00ca3d14945e2d4eecd0454938752711a5f65564dfb38fc84f";

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Upload file to IPFS
  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const headers = {
      pinata_api_key: pinataAPIKey,
      pinata_secret_api_key: pinataAPISecret,
    };
    try {
      const response = await axios.post(pinataEndpoint, formData, {
        headers: headers,
      });
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error("Error uploading to IPFS", error);
      setRequestStatus("Error uploading resume to IPFS.");
      return null;
    }
  };

  // Send request to admin with resume IPFS link
  const sendRequest = async () => {
    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

    setIsUploading(true);
    const ipfsLink = await uploadToIPFS(resume);
    if (ipfsLink) {
      try {
        await addDoc(collection(db, "requests"), {
          ipfsLink: ipfsLink,
          status: "pending",
        });
        alert("Request sent successfully!");
        setResume(null);
        setRequestStatus("Request sent successfully.");
      } catch (error) {
        console.error("Error sending request:", error);
        setRequestStatus("Error sending request.");
      }
    }
    setIsUploading(false);
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-12 rounded-lg shadow-lg bg-yellow-50">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-yellow-700">
            Version 0.0.1
          </span>
          <h1 className="text-3xl font-semibold text-yellow-700">ChainEd</h1>
        </div>
      </div>

      {/* Teacher Panel */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold">Teacher Panel</h2>
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          className="w-full p-4 mb-6 border border-yellow-300 rounded-lg"
        />
        <button
          onClick={sendRequest}
          className="w-full py-3 font-semibold text-white transition duration-300 bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Send Request"}
        </button>
        {requestStatus && (
          <p className="mt-4 text-center text-yellow-700">{requestStatus}</p>
        )}
      </div>
    </div>
  );
};

export default Teacher;
