import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { FaChalkboardTeacher, FaInfoCircle, FaCheckCircle, FaBook, FaQuestionCircle } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How does ChainED ensure content quality?",
      answer:
        "ChainED ensures quality by verifying the teacher's credentials through the admin before allowing them to publish content. This process maintains the authenticity of educational materials.",
    },
    {
      question: "What role does IPFS play in ChainED?",
      answer:
        "IPFS is used to store documentation as hashes temporarily. After admin approval, this metadata is stored securely on smart contracts in Avalanche and Ethereum blockchains.",
    },
    {
      question: "Is ChainED suitable for all types of learners?",
      answer:
        "Yes, ChainED provides personalized courses and interactive learning materials that cater to various learning styles and needs, making it suitable for everyone.",
    },
  ];

  return (
    <div className="bg-black">
      <div className="container min-h-screen px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-[60vh] w-[1200px] mx-auto">
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

        {/* FAQ Section */}
        <div className="text-left text-blue-100">
          <div className="flex items-center justify-start mb-6">
            <FaQuestionCircle className="w-8 h-8 mr-3 text-violet-400" />
            <h2 className="text-5xl font-extrabold text-violet-400">
              Frequent FAQs
            </h2>
          </div>

          {/* Centered and Reduced Width */}
          <div className="max-w-3xl mx-auto mt-20 space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 border-2 rounded-lg bg-violet-700 border-violet-900"
              >
                {/* FAQ Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left text-white"
                >
                  <span className="text-2xl font-bold">{faq.question}</span>
                  <span className="text-3xl">
                    {openFAQ === index ? "-" : "+"}
                  </span>
                </button>

                {/* FAQ Answer */}
                {openFAQ === index && (
                  <p className="mt-4 text-lg leading-relaxed text-white">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
