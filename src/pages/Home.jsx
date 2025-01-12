import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { FaChalkboardTeacher, FaInfoCircle } from "react-icons/fa";
import { FaCheckCircle, FaBook} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black">
      <div className="container min-h-screen px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[70vh]">
          {/* Learner Box */}
          <button
            onClick={() => navigate("/learner")}
            className="relative flex flex-col items-center justify-center p-8 transition-all duration-300 border-2 bg-violet-700 border-violet-900 group rounded-xl hover:bg-violet-600 hover:shadow-xl"
          >
            <GraduationCap className="w-24 h-24 mb-4 text-blue-100 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
            <h2 className="mb-4 text-3xl font-bold text-blue-100 group-hover:text-white">
              I'm a Learner
            </h2>
            <p className="max-w-md text-center text-blue-300 group-hover:text-blue-100">
              Start your learning journey with personalized courses and
              interactive content.
            </p>
          </button>

          {/* Teacher Box */}
          <button
            onClick={() => navigate("/teacher")}
            className="relative flex flex-col items-center justify-center p-8 transition-all duration-300 border-2 bg-violet-700 border-violet-900 group rounded-xl hover:bg-violet-600 hover:shadow-xl"
          >
            <FaChalkboardTeacher className="w-24 h-24 mb-4 text-blue-100 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
            <h2 className="mb-4 text-3xl font-bold text-blue-100 group-hover:text-white">
              I'm a Teacher
            </h2>
            <p className="max-w-md text-center text-blue-300 group-hover:text-blue-100">
              Create and manage your courses, connect with students, and share
              your knowledge.
            </p>
          </button>
        </div>

        {/* About Section */}
        <div className="mt-16 text-left text-blue-100">
          <div className="flex items-center justify-start mb-6">
            <FaInfoCircle className="w-8 h-8 mr-3 text-violet-400" />
            <h2 className="text-5xl font-extrabold text-violet-400">About</h2>
          </div>

          {/* Flex container to align iframe and text side by side */}
          <div className="flex flex-col items-center justify-between md:flex-row">
            {/* About Text */}
            <div className="max-w-3xl mx-auto text-2xl md:w-2/3">
              <p className="mb-8 text-xl">
                <FaCheckCircle className="inline-block mr-2 text-violet-400" />
                <span className="font-bold">
                  Our platform offers personalized courses
                </span>
                , interactive learning materials, and a wide range of
                educational tools designed to cater to every learner's needs.
                All content on this platform is certified by educators, ensuring
                authenticity and trust. We believe in empowering both learners
                and teachers to engage in a
                <span className="font-bold">
                  collaborative and transparent educational experience
                </span>
                .
              </p>

              <p className="text-xl">
                <FaBook className="inline-block mr-2 text-violet-400" />
                <span className="font-bold">ChainED</span> supports a wide range
                of learning materials, ensuring learners receive quality
                education. Whether you're interested in theory or practice,
                you'll find content that fits your needs.
              </p>

              <p className="mt-8 text-xl">
                <FaChalkboardTeacher className="inline-block mr-2 text-violet-400" />
                Our teachers are certified professionals committed to delivering
                high-quality, engaging lessons. Join{" "}
                <span className="text-blue-300">ChainED</span> and experience a
                community focused on educational growth.
              </p>
            </div>

            {/* About Iframe */}
            <iframe
              src="https://lottie.host/embed/1e40e773-96ae-4f5a-92e8-e2340d758069/gt3xOR4uy7.lottie"
              className="w-full md:w-1/3 h-[500px] md:h-[600px] rounded-xl border-none shadow-lg"
              title="About Animation"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
