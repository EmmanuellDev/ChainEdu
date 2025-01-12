import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore"; // Correct import here
import axios from "axios";
import { CloudUpload, Book, Info, FileText, MessageCircle } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";

const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataApiKey = "ba943b167d821f1de695";
const pinataApiSecret =
  "86eeb88f5c80cd00ca3d14945e2d4eecd0454938752711a5f65564dfb38fc84e";

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
      navigate("/"); // Redirect to homepage after success
    } catch (error) {
      console.error("Error publishing course:", error);
      alert("Failed to publish course.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-900">
      {/* Fixed Header with Home Button on the right */}
      <div className="absolute right-0 w-24 p-4 px-5 mr-5 text-white rounded-md shadow-md bg-violet-800">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-lg font-semibold"
        >
          Home
        </button>
      </div>

      {canPublish ? (
        <form
          className="max-w-lg p-6 mx-auto text-white bg-gray-800 rounded-lg shadow-md mt-14"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-4 text-2xl font-semibold text-violet-400">
            <Book className="inline-block mr-2" size={28} /> Publish Course
          </h1>

          {/* Course Name */}
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">
              <Book className="inline-block mr-2" size={20} />
              Course Name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-3 text-white bg-gray-700 border-2 rounded-lg border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Enter course name"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">
              <Info className="inline-block mr-2" size={20} />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-white bg-gray-700 border-2 rounded-lg border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Enter course description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Upload PDF */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">
              <FileText className="inline-block mr-2" size={20} />
              Upload PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full p-3 text-white bg-gray-700 border-2 rounded-lg border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md ${
              isPublishing ? "bg-gray-400" : "bg-violet-600 hover:bg-violet-500"
            }`}
            disabled={isPublishing}
          >
            {isPublishing ? (
              <span className="flex items-center justify-center">
                <CloudUpload className="mr-2 animate-spin" />
                Publishing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <CloudUpload className="mr-2" />
                Publish Now
              </span>
            )}
          </button>
        </form>
      ) : (
        <p className="text-lg text-center text-red-500">
          You do not have permission to publish data.
        </p>
      )}

      {/* Note Box */}
      <div className="absolute flex items-center justify-center max-w-xs p-6 text-white bg-gray-800 rounded-lg shadow-md top-1/4 right-4">
        <MessageCircle className="mr-3 text-violet-400" size={24} />
        <p className="text-lg text-center">
          Here you can publish the notes, which will be available to all
          learners.
        </p>
      </div>
    </div>
  );
};

export default PublishData;
