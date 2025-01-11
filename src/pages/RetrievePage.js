import React, { useState } from "react";
import { retrieveMessage } from "../integration";

const RetrievePage = () => {
  const [retrievedMessage, setRetrievedMessage] = useState("");
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [error, setError] = useState("");

  const handleRetrieve = async () => {
    try {
      setIsRetrieving(true);
      setError("");
      const message = await retrieveMessage();
      if (message) {
        setRetrievedMessage(message);
      } else {
        setError("No message found. Please store a message first.");
      }
    } catch (err) {
      console.error("Error retrieving message:", err);
      setError("Failed to retrieve the message.");
    } finally {
      setIsRetrieving(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-green-500">
        Retrieve Message
      </h1>
      <button
        onClick={handleRetrieve}
        disabled={isRetrieving}
        className={`px-4 py-2 text-white font-semibold rounded-md ${
          isRetrieving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isRetrieving ? "Retrieving..." : "Retrieve Message"}
      </button>
      {retrievedMessage && (
        <p className="mt-4 text-green-500">
          Retrieved Message: {retrievedMessage}
        </p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default RetrievePage;
