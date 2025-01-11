import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore"; // Correct import here
import axios from "axios";
import { useNavigate } from "react-router-dom";

const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataApiKey = "ba943b167d821f1de695";
const pinataApiSecret =
  "86eeb88f5c80cd00ca3d14945e2d4eecd0454938752711a5f65564dfb38fc84f";

const PublishData = () => {
  const [canPublish, setCanPublish] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkPermissions = async () => {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const acceptedRequest = querySnapshot.docs.find(
        (doc) => doc.data().status === "accepted"
      );
      setCanPublish(Boolean(acceptedRequest));
    };

    checkPermissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !description || !pdfFile) {
      alert("All fields are required.");
      return;
    }

    setIsPublishing(true);

    try {
      // Prepare the file for Pinata upload
      const formData = new FormData();
      formData.append("file", pdfFile);

      // Pin the file to IPFS using Pinata
      const response = await axios.post(pinataEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret,
        },
      });

      const ipfsUrl = `https://ipfs.io/ipfs/${response.data.IpfsHash}`;

      // Save course data to Firestore
      await addDoc(collection(db, "courses"), {
        courseName,
        description,
        pdfUrl: ipfsUrl,
        createdAt: new Date(),
      });

      alert("Course published successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error publishing course:", error);
      alert("Failed to publish course.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="p-4">
      {canPublish ? (
        <form
          className="max-w-lg p-6 mx-auto bg-white rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-4 text-xl font-bold">Publish Course</h1>

          <label className="block mb-2 font-medium">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter course name"
            required
          />

          <label className="block mb-2 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter course description"
            rows="4"
            required
          ></textarea>

          <label className="block mb-2 font-medium">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              isPublishing ? "bg-gray-400" : "bg-blue-500"
            }`}
            disabled={isPublishing}
          >
            {isPublishing ? "Publishing..." : "Publish Now"}
          </button>
        </form>
      ) : (
        <p className="text-red-500">
          You do not have permission to publish data.
        </p>
      )}
    </div>
  );
};

export default PublishData;
