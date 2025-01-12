import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate to enable navigation
import { handleStoreMetadata } from "../../integration"; // Import the function from integration.js

const AdminApproval = () => {
  const { state } = useLocation(); // Get passed data from state
  const [courses, setCourses] = useState(state?.courses || []); // Store courses data from state
  const [storedCourses, setStoredCourses] = useState([]); // Track stored courses
  const navigate = useNavigate(); // Use navigate hook

  const handleApproveCourse = async (course) => {
    try {
      // Extract data needed for the smart contract
      const { courseName, description } = course;

      // Assuming there's no IPFS link, pass a placeholder or handle accordingly
      const ipfsLink = ""; // Replace with actual IPFS link if necessary

      // Call the function to store data in the contract
      await handleStoreMetadata(courseName, description, ipfsLink);

      // After storing, update the storedCourses state to reflect the course as stored
      setStoredCourses((prev) => [...prev, course.id]);

      alert("Course data stored in contract successfully!");
    } catch (error) {
      alert("Error storing course data in contract");
      console.error(error);
    }
  };

  // Handle navigation to Admin Home and Admin Approval
  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    console.log("Courses received in Admin Approval:", courses); // Log courses data for debugging
  }, [courses]);

  return (
    <div className="min-h-screen p-6 bg-black">
      <div className="flex justify-between w-full max-w-3xl mx-auto mb-6">
        {/* Buttons at the top */}
        <button
          onClick={() => handleNavigate("/admin")}
          className="px-6 py-2 text-white transition duration-200 bg-green-600 rounded-full hover:bg-green-700"
        >
          Admin Approval
        </button>
        <button
          onClick={() => handleNavigate("/admin-home")}
          className="px-6 py-2 text-white transition duration-200 bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Admin Storage
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-violet-400">
          Admin Storage
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-white">No courses to approve.</p>
        ) : (
          <div>
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-4 mb-4 text-white bg-gray-800 border rounded-lg shadow-md border-gradient-to-r from-indigo-500 to-pink-500"
              >
                <h2 className="text-2xl font-semibold text-violet-400">
                  {course.courseName}
                </h2>
                <p>{course.description}</p>
                {/* Check if the course has been stored */}
                <button
                  onClick={() => handleApproveCourse(course)}
                  className="px-6 py-2 mt-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                >
                  {storedCourses.includes(course.id)
                    ? "Stored"
                    : "Store in Contract"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApproval;
