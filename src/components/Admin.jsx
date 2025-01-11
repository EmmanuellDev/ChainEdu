import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const Admin = () => {
  const [requests, setRequests] = useState([]);

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

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Admin Panel</h1>
      {requests.map((request) => (
        <div
          key={request.id}
          className="flex items-center justify-between p-4 mb-4 border rounded"
        >
          <div>
            <p className="font-semibold">Resume (IPFS Link):</p>
            <a
              href={request.ipfsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Resume
            </a>
            <p>Status: {request.status}</p>
          </div>
          {request.status === "pending" && (
            <div>
              <button
                onClick={() => handleDecision(request.id, "accepted")}
                className="px-4 py-2 mr-2 text-white bg-green-500 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecision(request.id, "rejected")}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Admin;
