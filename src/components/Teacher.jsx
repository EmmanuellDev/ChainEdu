import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Teacher = () => {
  const [requestMessage, setRequestMessage] = useState("");

  const sendRequest = async () => {
    try {
      await addDoc(collection(db, "requests"), {
        message: requestMessage,
        status: "pending",
      });
      alert("Request sent successfully!");
      setRequestMessage("");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Teacher Panel</h1>
      <textarea
        value={requestMessage}
        onChange={(e) => setRequestMessage(e.target.value)}
        className="w-full p-2 mb-4 border"
        placeholder="Enter your request here..."
      />
      <button
        onClick={sendRequest}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Send Request
      </button>
    </div>
  );
};

export default Teacher;
