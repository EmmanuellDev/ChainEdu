import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminHome = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Function to navigate to AdminApproval with the courses data
  const handleNavigateToAdminApproval = () => {
    navigate("/admin-approval", { state: { courses } });
  };

  // Function to navigate to Admin panel
  const handleNavigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="flex justify-center min-h-screen p-6 bg-black">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between mb-6">
          {/* Button to navigate to Admin Panel */}
          <button
            onClick={handleNavigateToAdmin}
            className="px-6 py-2 text-white rounded-full bg-violet-600 hover:bg-violet-700"
          >
            Admin Approval
          </button>
          {/* Button to navigate to Admin Approval page */}
          <button
            onClick={handleNavigateToAdminApproval}
            className="px-6 py-2 text-white rounded-full bg-violet-600 hover:bg-violet-700"
          >
            Admin Storage
          </button>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-center text-violet-400">
          Published Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-white">No courses available.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 text-white bg-gray-800 border rounded-lg shadow-md border-gradient-to-r from-indigo-500 to-pink-500"
                >
                  <h2 className="text-xl font-semibold text-violet-400">
                    {course.courseName}
                  </h2>
                  <p className="mb-2">{course.description}</p>
                  <a
                    href={course.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-400 underline hover:text-blue-300"
                  >
                    Click to View
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
