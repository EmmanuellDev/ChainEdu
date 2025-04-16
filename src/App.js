import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Teacher from "./pages/teacher/Teacher";
import PublishData from "./pages/teacher/PublishData";
import AdminApprovalPage from "./pages/admin/AdminApprovalPage";
import AdminHome from "./pages/admin/AdminHome";
import LearnerHome from "./pages/learner/LearnerHome";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <Header />

        {/* Routes */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learner" element={<LearnerHome />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/publish" element={<PublishData />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-approval" element={<AdminApprovalPage />} />
           </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
