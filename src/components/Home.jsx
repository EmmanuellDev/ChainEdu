import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Home = () => {
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

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Published Courses</h1>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id} className="p-4 border rounded shadow-md">
                <h2 className="text-xl font-semibold">{course.courseName}</h2>
                <p className="mb-2">{course.description}</p>
                <a
                  href={course.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Click to View
                </a>
              </div>
            ))}
          </div>
          {/* Button to navigate to Admin Approval page */}
          <button
            onClick={handleNavigateToAdminApproval}
            className="px-6 py-2 mt-4 text-white bg-green-500 rounded"
          >
            Go to Admin Approval
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
