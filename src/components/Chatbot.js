import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("auto"); // For dynamic input box height

  const handleUserMessage = (event) => {
    setUserMessage(event.target.value);
  };

  const handleInputChange = (e) => {
    // Dynamically adjust textarea height based on content
    setUserMessage(e.target.value);
    setTextareaHeight("auto"); // Reset height before resizing
    setTimeout(() => {
      setTextareaHeight(`${e.target.scrollHeight}px`);
    }, 0);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add user message to chat history
    const newMessages = [...chatHistory, { text: userMessage, sender: "user" }];
    setChatHistory(newMessages);
    setUserMessage(""); // Clear the input field
    setTextareaHeight("auto"); // Reset input box height

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: "user-" + Date.now(), // Generate a unique session ID
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Add bot's reply to chat history
        setChatHistory([
          ...newMessages,
          { text: data.response, sender: "bot" },
        ]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setChatHistory([
        ...newMessages,
        { text: "Sorry, I encountered an error.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-5">
      {/* Chat History */}
      <div className="chat-history overflow-y-auto h-96 space-y-4 mb-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-xs rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-black"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 max-w-xs rounded-lg bg-gray-200 text-black">
              <p>...</p> {/* Three dots loading */}
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="input-container flex items-center space-x-2">
        <textarea
          value={userMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          style={{ height: textareaHeight }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 text-black p-3 rounded-lg disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
