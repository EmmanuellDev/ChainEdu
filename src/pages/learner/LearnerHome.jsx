import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaFilePdf, FaArrowUp, FaSearch, FaDownload, FaHome, FaDatabase, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LearnerHome = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Animation for cards when they load
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseData);
        setLoading(false);
        
        // Trigger animation after data is loaded
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to navigate to AdminApproval with the courses data
  const handleNavigateToAdminApproval = () => {
    navigate("/admin-approval", { state: { courses } });
  };

  // Function to navigate to Admin panel
  const handleNavigateToAdmin = () => {
    navigate("/admin");
  };

  // Function to handle PDF viewing
  const handleViewPdf = (e, pdfUrl) => {
    if (!pdfUrl) {
      e.preventDefault();
      alert("PDF is not available for this course.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute w-32 h-32 rounded-full opacity-10 bg-violet-500 top-20 left-20 animate-pulse"></div>
        <div className="absolute w-40 h-40 rounded-full opacity-10 bg-indigo-500 top-80 right-20 animate-pulse" style={{animationDelay: "1s"}}></div>
        <div className="absolute w-24 h-24 rounded-full opacity-10 bg-blue-500 bottom-40 left-40 animate-pulse" style={{animationDelay: "2s"}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header with navigation buttons */}
        <div className="flex items-center justify-between p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300 md:text-4xl">
            Published Courses
          </h1>
          
          <div className="flex space-x-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center px-4 py-2 text-white transition-all duration-300 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <FaHome className="mr-2" />
              <span className="hidden md:inline">Home</span>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="px-6 mx-auto mt-6 mb-10 md:px-10 max-w-7xl">
          <div className="relative mx-auto overflow-hidden border-2 rounded-full transition-all duration-300 border-violet-400 focus-within:border-violet-300 focus-within:shadow-lg focus-within:shadow-violet-500/20 max-w-md">
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-5 text-white bg-gray-800/80 focus:outline-none"
            />
            <FaSearch className="absolute transform -translate-y-1/2 text-violet-400 right-4 top-1/2" />
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 rounded-full border-t-violet-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
            <p className="mt-4 text-white">Loading courses...</p>
          </div>
        )}

        {/* Course Grid */}
        {!loading && (
          <div className="px-6 mx-auto md:px-10 max-w-7xl">
            {filteredCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-xl text-gray-300">No courses available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`transform transition-all duration-500 ${
                      isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredCard(course.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative h-full overflow-hidden transition-all duration-300 bg-gray-800 border-2 rounded-xl shadow-lg border-violet-500/30 hover:border-violet-400 hover:shadow-xl hover:shadow-violet-500/10 group">
                      {/* Background Gradient Effect */}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 group-hover:opacity-100"></div>
                      
                      <div className="relative z-10 flex flex-col h-full p-5">
                        <h2 className="mb-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-200">
                          {course.courseName}
                        </h2>
                        
                        <p className="flex-grow mb-4 text-gray-300">
                          {course.description}
                        </p>
                        
                        <div className="pt-3 mt-auto border-t border-gray-700">
                          <a
                            href={course.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleViewPdf(e, course.pdfUrl)}
                            className="flex items-center justify-center w-full py-2 font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:shadow-md group-hover:scale-105"
                          >
                            <FaFilePdf className="mr-2" />
                            <span>View Course PDF</span>
                          </a>
                        </div>
                      </div>
                      
                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-16 h-16">
                        <div className="absolute top-0 right-0 w-16 h-16 transition-all duration-300 rotate-45 translate-x-8 -translate-y-8 bg-gradient-to-r from-violet-500 to-indigo-500 group-hover:translate-x-6 group-hover:-translate-y-6"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Footer */}
        <div className="py-10 mt-16 text-center text-gray-400">
          <p>© 2025 Course Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LearnerHome;