import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed data
import { handleStoreMetadata } from "../integration"; // Import the function from integration.js

const AdminApproval = () => {
  const { state } = useLocation(); // Get passed data from state
  const [courses, setCourses] = useState(state?.courses || []); // Store courses data from state
  const [storedCourses, setStoredCourses] = useState([]); // Track stored courses

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

  useEffect(() => {
    console.log("Courses received in Admin Approval:", courses); // Log courses data for debugging
  }, [courses]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Admin Approval Page</h1>

      {courses.length === 0 ? (
        <p>No courses to approve.</p>
      ) : (
        <div>
          {courses.map((course) => (
            <div key={course.id} className="p-4 mb-4 border rounded shadow-md">
              <h2 className="text-xl font-semibold">{course.courseName}</h2>
              <p>{course.description}</p>
              {/* Check if the course has been stored */}
              <button
                onClick={() => handleApproveCourse(course)}
                className="px-6 py-2 mt-2 text-white bg-blue-500 rounded"
              >
                {storedCourses.includes(course.id)
                  ? "Stored"
                  : "Approve and Store in Contract"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminApproval;
