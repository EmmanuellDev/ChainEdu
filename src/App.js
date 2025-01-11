import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Teacher from "./components/Teacher";
import PublishData from "./components/PublishData";
import HomePage from "./components/Home";
import AdminApprovalPage from "./components/AdminApprovalPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/publish" element={<PublishData />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-approval" element={<AdminApprovalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
