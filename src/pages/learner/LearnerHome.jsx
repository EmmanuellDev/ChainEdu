import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaFilePdf, FaArrowUp, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LearnerHome = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <div className="relative p-6 mb-8">
        <button
          onClick={() => navigate("/")}
          className="absolute px-6 py-3 text-white transition-colors rounded-lg right-6 top-6 bg-violet-600 hover:bg-violet-500"
        >
          Home
        </button>
        <h2 className="pt-20 text-4xl font-extrabold text-center text-violet-400">
          Published Courses
        </h2>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-12">
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 text-white bg-gray-700 border rounded-lg border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <FaSearch className="absolute transform -translate-y-1/2 text-violet-400 right-4 top-1/2" />
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-6 mb-8">
        <div className="flex items-center mx-auto space-x-3 max-w-7xl">
          <FaArrowUp className="text-4xl text-violet-400 animate-pulse" />
          <h1 className="text-5xl font-extrabold text-violet-400">Trending</h1>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="px-6 pb-10">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="relative flex flex-col h-64 overflow-hidden transition-all duration-300 bg-gray-800 border-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 border-violet-400 group"
              >
                <div className="flex flex-col h-full p-6">
                  <h3 className="mb-4 text-2xl font-bold text-blue-100">
                    {course.courseName}
                  </h3>
                  <p className="flex-grow overflow-auto text-sm text-gray-300">
                    {course.description}
                  </p>
                  <div className="pt-4 mt-4 border-t border-gray-600">
                    <a
                      href={course.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center transition-colors text-violet-400 hover:text-violet-300"
                    >
                      <FaFilePdf className="mr-2" />
                      <span className="text-sm font-medium">View PDF</span>
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-violet-600 group-hover:opacity-10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48">
            <p className="text-xl text-white">No courses available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerHome;
