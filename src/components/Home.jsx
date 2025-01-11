import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore"; // Correct import here

const HomePage = () => {
  const [courses, setCourses] = useState([]);

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

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Published Courses</h1>

      {courses.length > 0 ? (
        <div>
          {courses.map((course) => (
            <div key={course.id} className="p-4 mb-4 border rounded shadow-md">
              <h2 className="text-xl font-semibold">{course.courseName}</h2>
              <p className="mt-2">{course.description}</p>
              <a
                href={course.pdfUrl} // Link to the IPFS URL
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-500 hover:underline"
              >
                View PDF (IPFS Link)
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default HomePage;
