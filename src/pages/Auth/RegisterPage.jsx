import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsCalendar, BsChevronDown, BsImage, BsLockFill } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import moview_bg from "../../assets/auth/moview_bg.png";
import axios from "axios";
import { VITE_SERVER } from "../../constants/config.js";
import countries from "../../constants/countries.json";
import { useUser } from "../../context/UserContext.jsx";

// Assuming these imports are available and correct
// import moview_bg from '../../assets/auth/moview_bg.png';

// --- Configuration Data ---
const availableAvatars = [
  { id: 1, src: "https://placehold.co/40x40/f44336/white?text=A1" },
  { id: 2, src: "https://placehold.co/40x40/2196f3/white?text=A2" },
  { id: 3, src: "https://placehold.co/40x40/ffeb3b/black?text=A3" },
  { id: 4, src: "https://placehold.co/40x40/4caf50/white?text=A4" },
  { id: 5, src: "https://placehold.co/40x40/9c27b0/white?text=A5" },
];

const interestOptions = [
  "Action",
  "Adventures",
  "Love",
  "Family",
  "Drama",
  "Music",
  "Romance",
  "Mystery",
  "Magic",
  "High school",
  "Vampire",
  "Game",
];

// --- Step Components ---

// Step 1: Tell us about yourself
const Step1PersonalInfo = ({ onContinue, data, setData }) => (
  <>
    <h2 className="text-white text-2xl font-bold text-center mb-2">
      Tell us about yourself
    </h2>
    <p className="text-center text-[#C5DDFF] text-sm mb-6">
      Let’s know more about you
    </p>

    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
    >
      {/* Email Input */}
      <div>
        <p className="text-sm text-[#C5DDFF] mb-2">What's your email?</p>
        <div className="relative">
          <input
            type="email"
            placeholder="Your email address"
            value={data.email || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full p-3 bg-[#1C365A] border border-[#21477C] rounded-lg text-white placeholder-[#AECFFF] focus:outline-none focus:ring-2 focus:ring-[#18B451] pl-10"
            required
          />
          <IoMdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AECFFF]" />
        </div>
      </div>

      {/* Full Name Input */}
      <div>
        <p className="text-sm text-[#C5DDFF] mb-2">What’s your name?</p>
        <div className="relative">
          <input
            type="text"
            placeholder="Your full name"
            value={data.name || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-3 bg-[#1C365A] border border-[#21477C] rounded-lg text-white placeholder-[#AECFFF] focus:outline-none focus:ring-2 focus:ring-[#18B451] pl-10"
            required
          />
          <IoMdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AECFFF]" />
        </div>
      </div>

      {/* Country Select */}
      <div>
        <p className="text-sm text-[#C5DDFF] mb-2">Where are you located?</p>
        <div className="relative">
          <select
            value={data.country || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, country: e.target.value }))
            }
            className="w-full p-3 bg-[#1C365A] border border-[#21477C] rounded-lg text-white placeholder-[#AECFFF] appearance-none focus:outline-none focus:ring-2 focus:ring-[#18B451] pl-3 pr-10"
            required
          >
            <option value="" disabled className="bg-[#1C365A]">
              Choose your country
            </option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
            {/* Add more countries */}
          </select>
          <BsChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AECFFF] pointer-events-none" />
        </div>
      </div>

      {/* Date of Birth Input */}
      <div>
        <p className="text-sm text-[#C5DDFF] mb-2">How old are you?</p>
        <div className="relative">
          <input
            type="date"
            value={data.dob || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, dob: e.target.value }))
            }
            className="w-full p-3 bg-[#1C365A] border border-[#21477C] rounded-lg text-white placeholder-[#AECFFF] focus:outline-none focus:ring-2 focus:ring-[#18B451] appearance-none pl-10"
            required
          />
          <BsCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AECFFF]" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#12B037] to-[#18B451] text-white py-3 rounded-full text-md font-medium shadow-[0_11px_29px_0_rgba(20,169,144,0.3)] hover:opacity-90 transition-opacity mt-8"
      >
        Continue
      </button>
    </form>
  </>
);

// Step 2: Upload a profile picture
const Step2Avatar = ({ onContinue, data, setData }) => {
  const fileRef = useRef(null);

  const handleAvatarSelect = (avatarSrc) => {
    setData((prev) => ({ ...prev, profilePicture: avatarSrc }));
  };

  return (
    <>
      <h2 className="text-white text-2xl font-bold text-center mb-2">
        Upload a profile picture
      </h2>
      <p className="text-center text-[#C5DDFF] text-sm mb-6">
        Upload a clear and visible photo of yourself
      </p>

      {/* Upload Area */}
      <div className="flex justify-center mb-8">
        <div
          className="w-32 h-32 bg-[#1C365A] rounded-xl flex items-center justify-center cursor-pointer border-2 border-dashed border-[#21477C] hover:border-[#18B451] transition-colors"
          onClick={() => fileRef.current.click()}
        >
          {data.profilePicture ? (
            <img
              src={data.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <BsImage className="text-4xl text-[#AECFFF]" />
          )}
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setData((prev) => ({
                  ...prev,
                  profilePicture: URL.createObjectURL(file), // preview
                  avatarFile: file, // actual file
                }));
              }
            }}
          />
          {/* <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleAvatarSelect(URL.createObjectURL(e.target.files[0]));
              }
            }}
          /> */}
        </div>
      </div>

      <p className="text-center text-sm text-[#C5DDFF] mb-4">
        Or Select an avatar
      </p>

      {/* Avatar Selection */}
      <div className="flex justify-center space-x-3 mb-10">
        {availableAvatars.map((avatar) => (
          <img
            key={avatar.id}
            src={avatar.src}
            alt={`Avatar ${avatar.id}`}
            className={`w-10 h-10 rounded-full object-cover border-2 cursor-pointer transition-all ${
              data.profilePicture === avatar.src
                ? "border-[#18B451] scale-110"
                : "border-transparent hover:border-[#21477C]"
            }`}
            onClick={() => handleAvatarSelect(avatar.src)}
          />
        ))}
      </div>

      <button
        type="button"
        className="w-full bg-gradient-to-r from-[#12B037] to-[#18B451] text-white py-3 rounded-full text-md font-medium shadow-[0_11px_29px_0_rgba(20,169,144,0.3)] hover:opacity-90 transition-opacity"
        onClick={onContinue}
        disabled={!data.profilePicture}
      >
        Continue
      </button>
    </>
  );
};

// Step 3: Set a New Password
const Step3Password = ({ onContinue, data, setData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.password &&
      data.password === data.confirmPassword &&
      data.password.length >= 8
    ) {
      onContinue();
    } else {
      alert("Passwords must match and be at least 8 characters long.");
    }
  };

  return (
    <>
      <h2 className="text-white text-2xl font-bold text-center mb-2">
        Set a New Password
      </h2>
      <p className="text-center text-[#C5DDFF] text-sm mb-8">
        Choose a secure password that’s at least 8 characters long
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* New Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={data.password || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full p-3 bg-[#1C365A] border border-[#21477C] rounded-lg text-white placeholder-[#AECFFF] focus:outline-none focus:ring-2 focus:ring-[#18B451] pl-10"
            minLength={8}
            required
          />
          <BsLockFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AECFFF]" />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AECFFF] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={data.confirmPassword || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            className="w-full p-3 bg-[#1C365A] border border-[#21477C] rounded-lg text-white placeholder-[#AECFFF] focus:outline-none focus:ring-2 focus:ring-[#18B451] pl-10"
            minLength={8}
            required
          />
          <BsLockFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AECFFF]" />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AECFFF] cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#12B037] to-[#18B451] text-white py-3 rounded-full text-md font-medium shadow-[0_11px_29px_0_rgba(20,169,144,0.3)] hover:opacity-90 transition-opacity mt-8"
        >
          Continue
        </button>
      </form>
    </>
  );
};

// Step 4: Choose your interest
const Step4Interests = ({ onFinish, data, setData }) => {
  const isSelected = (interest) => data.interests?.includes(interest);

  const toggleInterest = (interest) => {
    setData((prev) => {
      const currentInterests = prev.interests || [];
      if (currentInterests.includes(interest)) {
        return {
          ...prev,
          interests: currentInterests.filter((i) => i !== interest),
        };
      } else {
        return { ...prev, interests: [...currentInterests, interest] };
      }
    });
  };

  return (
    <>
      <h2 className="text-white text-2xl font-bold text-center mb-2">
        Choose your interest
      </h2>
      <p className="text-center text-[#C5DDFF] text-sm mb-6">
        Let’s help you personalize your experience
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {interestOptions.map((interest) => (
          <button
            key={interest}
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              isSelected(interest)
                ? "bg-[#18B451] text-white shadow-lg"
                : "bg-[#1C365A] text-[#C5DDFF] hover:bg-[#21477C]"
            }`}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="w-full bg-gradient-to-r from-[#12B037] to-[#18B451] text-white py-3 rounded-full text-md font-medium shadow-[0_11px_29px_0_rgba(20,169,144,0.3)] hover:opacity-90 transition-opacity"
        onClick={onFinish}
        disabled={!data.interests || data.interests.length === 0}
      >
        Continue
      </button>
    </>
  );
};

// --- Main Register/Onboarding Page Component ---

const RegisterPage = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(1); // 1 to 4
  const [formData, setFormData] = useState({});

  const { setUser } = useUser();

  // formData includes this data
  // confirmPassword
  // country
  // dob
  // interests[]
  // name
  // password
  // profilePicture

  const handleContinue = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = async () => {
    try {
      // Prepare form data
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("interests", formData.interests);
      formDataToSend.append("dateOfBirth", formData.dob);

      // Add avatar file
      if (formData.avatarFile) {
        formDataToSend.append("avatar", formData.avatarFile);
      } else {
        alert("Please upload or select an avatar before continuing.");
        return;
      }

      // Send request with Axios
      const res = await axios.post(
        `${VITE_SERVER}/auth/signup`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(res.data.user);
      alert("Account created successfully!");
      nav("/dashboard/home");
    } catch (error) {
      // Handle errors properly
      if (error.response) {
        console.error("Signup error:", error.response.data);
        alert(error.response.data.message || "Signup failed");
      } else {
        console.error("Signup error:", error.message);
        alert(error.message);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1PersonalInfo
            onContinue={handleContinue}
            data={formData}
            setData={setFormData}
          />
        );
      case 2:
        return (
          <Step2Avatar
            onContinue={handleContinue}
            data={formData}
            setData={setFormData}
          />
        );
      case 3:
        return (
          <Step3Password
            onContinue={handleContinue}
            data={formData}
            setData={setFormData}
          />
        );
      case 4:
        return (
          <Step4Interests
            onFinish={handleFinish}
            data={formData}
            setData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      // Using a placeholder background style since moview_bg import is commented out
      style={{
        backgroundImage: `url(${moview_bg})`,
      }}
      className="flex justify-center items-center w-screen h-screen bg-cover bg-center"
    >
      <div className="bg-[#112F5A] bg-opacity-90 rounded-md w-[90%] sm:w-[500px] p-8 md:p-12 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => nav("/")}
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>

        {renderStep()}
      </div>
    </div>
  );
};

export default RegisterPage;
