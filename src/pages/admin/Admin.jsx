import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { CheckCircle, XCircle, FileText } from "lucide-react"; // Icons for accept and reject
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Admin = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      const requestRef = doc(db, "requests", id);
      await updateDoc(requestRef, { status: decision });
      alert(`Request ${decision === "accepted" ? "accepted" : "rejected"}!`);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: decision } : req))
      );
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  // Handle navigation to Admin Home and Admin Storage
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen p-6 bg-black">
      <div className="flex justify-between w-full max-w-3xl mx-auto mb-6">
        {/* Buttons at the top */}
        <button
          onClick={() => handleNavigate("/admin-home")}
          className="px-6 py-2 text-white transition duration-200 bg-green-600 rounded-full hover:bg-green-700"
        >
          Admin Home
        </button>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="mb-6 text-4xl font-bold text-center text-violet-400">
          Admin Panel
        </h1>
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-5 mb-5 text-white bg-gray-800 border-2 rounded-lg shadow-lg border-gradient-to-r from-indigo-500 to-pink-500"
          >
            <div className="w-2/3">
              <p className="mb-2 text-xl font-semibold text-violet-400">
                Resume (IPFS Link):
              </p>
              <a
                href={request.ipfsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-400 underline hover:text-blue-300"
              >
                <FileText className="inline-block mr-2" size={20} />
                View Resume
              </a>
              <p className="mt-2">
                Status:{" "}
                <span
                  className={`font-bold ${
                    request.status === "pending"
                      ? "text-yellow-500"
                      : request.status === "accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {request.status}
                </span>
              </p>
            </div>
            {request.status === "pending" && (
              <div className="flex items-center">
                <button
                  onClick={() => handleDecision(request.id, "accepted")}
                  className="px-6 py-2 mr-3 text-white transition duration-200 bg-green-600 rounded-full hover:bg-green-700"
                >
                  <CheckCircle className="inline-block mr-2" size={20} />
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(request.id, "rejected")}
                  className="px-6 py-2 text-white transition duration-200 bg-red-600 rounded-full hover:bg-red-700"
                >
                  <XCircle className="inline-block mr-2" size={20} />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
