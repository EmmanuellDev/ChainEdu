import React, { useState, useEffect } from "react";
import {
  initializeWeb3,
  acceptProposal,
  rejectProposal,
  getTeacherDetails,
} from "./integration";
import UploadComponent from "./components/UploadComponent";

function App() {
  const [teacherAddress, setTeacherAddress] = useState("");
  const [teacherDetails, setTeacherDetails] = useState(null);

  const handleAcceptProposal = async () => {
    try {
      await acceptProposal(teacherAddress);
      alert("Proposal accepted successfully.");
    } catch (error) {
      alert("Error accepting proposal.");
      console.error(error);
    }
  };

  const handleRejectProposal = async () => {
    try {
      await rejectProposal(teacherAddress);
      alert("Proposal rejected successfully.");
    } catch (error) {
      console.error("Error rejecting proposal:", error);
      throw error;
    }
  };

  const fetchTeacherDetails = async () => {
    try {
      const details = await getTeacherDetails(teacherAddress);
      setTeacherDetails(details);
    } catch (error) {
      alert("Error fetching teacher details.");
      console.error(error);
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  return (
    <div className="App">
      <h1>Teacher Registration</h1>

      {/* Upload Component */}
      <UploadComponent />

      <h2>Manage Proposals</h2>
      <input
        type="text"
        placeholder="Teacher Address"
        value={teacherAddress}
        onChange={(e) => setTeacherAddress(e.target.value)}
      />
      <button onClick={fetchTeacherDetails}>Get Teacher Details</button>
      <button onClick={handleAcceptProposal}>Accept Proposal</button>
      <button onClick={handleRejectProposal}>Reject Proposal</button>

      {teacherDetails && (
        <div>
          <h3>Teacher Details</h3>
          <p>IPFS Hash: {teacherDetails.ipfsHash}</p>
          <p>Is Registered: {teacherDetails.isRegistered.toString()}</p>
          <p>Is Pending: {teacherDetails.isPending.toString()}</p>
          <p>Is Rejected: {teacherDetails.isRejected.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
