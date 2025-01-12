import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore"; // Correct import here
import { FaFilePdf, FaArrowUp } from "react-icons/fa"; // Importing the PDF and arrow up icons
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LearnerHome = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetching courses from Firestore
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-black">
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute px-6 py-3 mt-20 text-white rounded-lg top-4 right-4 bg-violet-600 hover:bg-violet-500"
      >
        Home
      </button>

      {/* Courses Section */}
      <h2 className="mb-12 text-4xl font-extrabold text-center text-violet-400">
        Published Courses
      </h2>

      {/* Search Bar */}
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-3 text-white bg-gray-700 border rounded-lg border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>

      {/* Trending Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="flex items-center space-x-2 text-5xl font-extrabold text-center text-violet-400">
          <FaArrowUp className="text-4xl animate-pulse" />
          <span>Trending</span>
        </h1>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 text-white transition-all duration-300 transform bg-gray-800 border-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 border-gradient-to-r from-violet-400 via-blue-600 to-pink-500"
            >
              <h3 className="mb-4 text-2xl font-semibold text-blue-100">
                {course.courseName}
              </h3>
              <p className="mb-4 text-sm text-gray-300">{course.description}</p>
              <div className="flex items-center">
                <FaFilePdf className="mr-2 text-violet-400" />
                <a
                  href={course.pdfUrl} // Link to the IPFS URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-violet-400 hover:underline"
                >
                  View PDF (IPFS Link)
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-center text-white">No courses available.</p>
      )}
    </div>
  );
};

export default LearnerHome;
