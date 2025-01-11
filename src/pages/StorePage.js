import React, { useState } from "react";
import { storeMessage } from "../integration";

const StorePage = () => {
  const [message, setMessage] = useState("");
  const [isStoring, setIsStoring] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleStore = async () => {
    try {
      if (!message) {
        alert("Please enter a message.");
        return;
      }
      setIsStoring(true);
      setStatus("");
      setError("");
      await storeMessage(message);
      setStatus("Message stored successfully!");
      setMessage("");
    } catch (err) {
      console.error("Error storing message:", err);
      setError("Failed to store the message.");
    } finally {
      setIsStoring(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-blue-500">Store a Message</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        placeholder="Enter your message..."
      />
      <button
        onClick={handleStore}
        disabled={isStoring}
        className={`px-4 py-2 text-white font-semibold rounded-md ${
          isStoring
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isStoring ? "Storing..." : "Store Message"}
      </button>
      {status && <p className="mt-4 text-green-500">{status}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default StorePage;
