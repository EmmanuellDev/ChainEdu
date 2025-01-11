import React, { useState } from "react";
import { uploadToPinata, submitProposal } from "../integration";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadAndSubmit = async () => {
    try {
      if (!file) {
        alert("Please select a file first.");
        return;
      }
      setIsLoading(true);
      const ipfsHash = await uploadToPinata(file);
      await submitProposal(ipfsHash);
      alert("Proposal submitted successfully. IPFS Hash: " + ipfsHash);
      setFile(null);
    } catch (error) {
      alert("Error uploading or submitting proposal.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
        Submit Your Proposal
      </h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleUploadAndSubmit}
        disabled={isLoading || !file}
        className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Uploading..." : "Upload and Submit"}
      </button>
    </div>
  );
};

export default UploadComponent;