import React, { useState } from "react";
import axios from "axios";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { AiOutlineFile } from "react-icons/ai"; // Icon for file input
import { FaPaperPlane } from "react-icons/fa"; // Icon for the button
import { BsFillInfoCircleFill } from "react-icons/bs"; // Icon for the note
import { useNavigate } from "react-router-dom"; // React Router for navigation

const Teacher = () => {
  const [resume, setResume] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate(); // React Router's navigate function

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

  // Handle navigation to "/publish"
  const handlePublish = () => {
    navigate("/publish");
  };

  // Handle navigation to Home page
  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black">
      {/* Home Button at Top Left */}
      <button
        onClick={handleHome}
        className="absolute px-4 py-2 font-semibold text-white rounded-lg shadow-md top-4 left-4 bg-violet-600 hover:bg-violet-500"
      >
        Home
      </button>

      {/* Publish Button at Top Right */}
      <button
        onClick={handlePublish}
        className="absolute px-4 py-2 font-semibold text-white rounded-lg shadow-md top-4 right-4 bg-violet-600 hover:bg-violet-500"
      >
        Publish
      </button>

      <div className="w-full h-auto max-w-xl p-10 mx-auto bg-black rounded-lg shadow-lg">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="w-full text-4xl font-bold text-violet-400">
            Send request to the admin
          </h1>
        </div>

        {/* Teacher Panel */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold text-blue-100">
            Teacher Panel
          </h2>

          {/* File Input with Icon */}
          <div className="flex items-center mb-6">
            <AiOutlineFile className="mr-3 text-violet-500" size={24} />
            <input
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              className="w-full p-4 text-blue-100 bg-black border rounded-lg border-violet-500"
            />
          </div>

          {/* Submit Button with Icon */}
          <button
            onClick={sendRequest}
            className="flex items-center justify-center w-full py-3 font-semibold text-white transition duration-300 rounded-lg shadow-md bg-violet-600 hover:bg-violet-500"
            disabled={isUploading}
          >
            <FaPaperPlane className="mr-3" size={20} />
            {isUploading ? "Uploading..." : "Send Request"}
          </button>

          {requestStatus && (
            <p className="mt-4 text-center text-yellow-300">{requestStatus}</p>
          )}
        </div>
      </div>

      {/* Note Box Outside of the Request Box, Positioned to the Right */}
      <div className="absolute right-0 flex items-center h-48 p-4 mr-3 transform -translate-y-1/2 bg-gray-700 rounded-lg shadow-md top-1/2 w-72">
        <BsFillInfoCircleFill className="mr-4 text-yellow-400" size={60} />
        <p className="text-lg text-white">
          This is where you can submit your content publishing request to the
          admin.
        </p>
      </div>
    </div>
  );
};

export default Teacher;
