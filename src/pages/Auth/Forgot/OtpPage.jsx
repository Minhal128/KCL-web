import React, { useState, useRef, useEffect } from "react";
import moview_bg from "../../../assets/auth/moview_bg.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { VITE_SERVER } from "../../../constants/config.js";

const XIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const [isVerified, setIsVerified] = useState(false); // For demo feedback
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handler for typing in the OTP inputs
  const handleChange = (element, index) => {
    // Only allow numeric input
    if (isNaN(element.value)) return;

    // Update the OTP state
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input if a digit was entered
    if (element.value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handler for backspace key (to move focus backward)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      // If the current input is empty, move focus to the previous one
      inputRefs.current[index - 1].focus();
    }
  };

  // Handler for the Continue button
  const handleContinue = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (!email) {
      alert("Invalid or missing email. Please go back and try again.");
      return;
    }

    if (fullOtp.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${VITE_SERVER}/auth/verify-otp`,
        { email, otp: fullOtp },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("OTP verified:", res.data);
      setIsVerified(true);
      alert("OTP verified successfully!");

      // Navigate to password reset page
      setTimeout(() => {
        nav(`/forgot/password?token=${encodeURIComponent(res.data.token)}`);
      }, 1000);
    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.response) {
        alert(error.response.data.message || "OTP verification failed.");
      } else {
        alert("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    console.log("Navigating to home page (/)");
    nav("/");
  };

  return (
    <div
      style={{ backgroundImage: isVerified ? "none" : `url(${moview_bg})` }}
      className="font-inter flex justify-center items-center w-screen h-screen bg-cover bg-center transition-all duration-500 p-4"
    >
      <div
        className={`
        bg-[#112F5A] bg-opacity-95 rounded-xl w-full max-w-[500px] p-8 md:p-12 relative shadow-2xl transition-all duration-500
        ${isVerified ? "scale-0 opacity-0" : "scale-100 opacity-100"}
      `}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          onClick={handleClose}
          aria-label="Close verification modal"
        >
          <XIcon className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-white text-3xl font-bold text-center mb-2">
            OTP Verification
          </h2>
          <p className="text-center text-[#C5DDFF] text-base">
            Enter the code sent to your email address
          </p>
        </div>

        <form onSubmit={handleContinue} className="space-y-8">
          {/* 6 OTP Input Fields */}
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 
                  text-center text-xl font-bold 
                  bg-[#112F5A] text-white 
                  border border-gray-600 
                  rounded-full focus:outline-none focus:ring-2 
                  focus:ring-[#12B037] transition-all duration-200
                  shadow-inner
                  ${data ? "border-[#12B037]" : "border-gray-600"}
                `}
                required
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={otp.join("").length !== 6}
            className={`
              w-full py-3 rounded-full text-lg font-medium shadow-lg transition-all duration-300 transform 
              ${
                otp.join("").length === 6
                  ? "bg-gradient-to-r from-[#12B037] to-[#18B451] text-white shadow-[0_11px_29px_0_rgba(20,169,144,0.4)] hover:scale-[1.01] hover:shadow-[0_15px_35px_0_rgba(20,169,144,0.6)]"
                  : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Continue
          </button>
        </form>

        {/* Resend OTP Link */}
        <p className="text-center text-sm mt-6 text-gray-300">
          Didn't receive the code?
          <button
            type="button"
            className="text-[#18B451] font-semibold ml-1 hover:underline focus:outline-none focus:ring-2 focus:ring-[#18B451] rounded"
            onClick={() => console.log("Resending OTP requested")}
          >
            Resend OTP
          </button>
        </p>
      </div>

      {/* Verification Success Message */}
      {isVerified && (
        <div className="text-white text-4xl font-bold p-8 bg-black bg-opacity-70 rounded-xl animate-pulse">
          OTP Verified! (Check Console)
        </div>
      )}
    </div>
  );
};

// Main App component to export
export default function App() {
  return (
    <div className="min-h-screen">
      {/* Custom font and basic setup */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <OtpVerification />
    </div>
  );
}
