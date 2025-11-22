import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdLanguage, MdSecurity, MdDelete, MdHelpCenter } from "react-icons/md";
import { FaVideo, FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  BsInfoCircleFill,
  BsCheckCircleFill,
  BsEmojiSmile,
  BsFillChatSquareTextFill,
  BsEnvelopeFill,
} from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

// Assuming this import is correct based on your prompt
import avatar from "../../../assets/dashboard/avatar.png";
import about_us from "../../../assets/dashboard/about_us.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import axios from "axios";
import { VITE_SERVER } from "../../../constants/config";

// --- Configuration Data ---
const menuItems = [
  { name: "Language", icon: MdLanguage, component: "Language" },
  { name: "Privacy", icon: MdSecurity, component: "Privacy" },
  { name: "Help center", icon: MdHelpCenter, component: "HelpCenter" },
  { name: "About us", icon: BsInfoCircleFill, component: "AboutUs" },
  { name: "Video quality", icon: FaVideo, component: "VideoQuality" },
  { name: "Settings", icon: FaCog, component: "Settings" },
  { name: "Delete account", icon: MdDelete, component: "DeleteAccount" },
  { name: "Logout", icon: FaSignOutAlt, component: "Logout" },
];

const initialLanguages = [
  { name: "Default (Device language)", code: "default" },
  { name: "English", code: "en" },
  { name: "French", code: "fr" },
  { name: "Spanish", code: "es" },
  { name: "Arabic", code: "ar" },
  { name: "Benghali", code: "bn" },
  { name: "Russian", code: "ru" },
  { name: "Portuguese", code: "pt" },
  { name: "Urdu", code: "ur" },
  { name: "Indonesia", code: "id" },
];

const videoQualityOptions = [
  { name: "Low quality", value: "low" },
  { name: "Medium quality", value: "medium" },
  { name: "High quality", value: "high" },
  { name: "4K", value: "4k" },
];

// Language View
const LanguageView = () => {
  const [languages, setLanguages] = useState(initialLanguages);
  const [loading, setLoading] = useState(false);

  // Fetch saved language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLanguages((prev) =>
        prev.map((lang) => ({
          ...lang,
          selected: lang.code === savedLang,
        }))
      );
    }
  }, []);

  // Detect device language
  const getDeviceLanguage = () => {
    if (typeof navigator !== "undefined") {
      return navigator.language || navigator.userLanguage || "en";
    }
    return "en";
  };

  // Handle selection
  const handleLanguageSelect = async (selectedCode) => {
    try {
      setLoading(true);

      let finalLang = selectedCode;

      // If default selected → use device language code
      if (selectedCode === "default") {
        finalLang = getDeviceLanguage();
      }

      // Send API request
      await axios.put(
        `${VITE_SERVER}/user/language`,
        { language: finalLang },
        { withCredentials: true }
      );

      // Save locally
      localStorage.setItem("language", selectedCode);

      // Update UI
      setLanguages((prev) =>
        prev.map((lang) => ({
          ...lang,
          selected: lang.code === selectedCode,
        }))
      );
    } catch (error) {
      console.error("Language update failed:", error.response?.data || error);
      alert("Failed to update language. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Language</h1>
      {languages.map((lang, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-4 border-b border-[#21477C]"
        >
          <p className="text-white">{lang.name}</p>
          {lang.selected ? (
            <BsCheckCircleFill className="text-[#129B7F] text-xl" />
          ) : (
            <AiOutlineCheck
              className={`text-[#AECFFF] text-xl cursor-pointer hover:text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !loading && handleLanguageSelect(lang.code)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Privacy View
const PrivacyView = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Policy</h1>
    <p className="text-sm leading-relaxed mb-4 text-[#AECFFF]">
      Your privacy is important to us. It is Brainstorming's policy to respect
      your privacy regarding any information we may collect from you across our{" "}
      <a href="#" className="text-yellow-400 hover:underline">
        website
      </a>
      , and other sites we own and operate.
    </p>
    <p className="text-sm leading-relaxed mb-4 text-[#AECFFF]">
      We only ask for personal information when we truly need it to provide a
      service to you. We collect it by fair and lawful means, with your
      knowledge and consent. We also let you know why we're collecting it and
      how it will be used.
    </p>
    <p className="text-sm leading-relaxed mb-4 text-[#AECFFF]">
      We only retain collected information for as long as necessary to provide
      you with your requested service. What data we store, we'll protect within
      commercially acceptable means to prevent loss and theft, as well as
      unauthorized access, disclosure, copying, use or modification.
    </p>
    <p className="text-sm leading-relaxed text-[#AECFFF]">
      We don't share any personally identifying information publicly or with
      third-parties, except when required to by law.
    </p>
  </div>
);

// Help Center View
const HelpCenterView = () => {
  const navigate = useNavigate();
  
  const goToSupportPage = () => {
    navigate('/dashboard/support');
  };

  return (
    <div className="p-8 flex">
      <div className="w-1/2 pr-8 border-r border-[#21477C]">
        <h1 className="text-2xl font-bold mb-1">Help center</h1>
        <h2 className="text-lg font-semibold mb-6">
          Tell us how we can be of help
        </h2>
        <p className="text-sm text-[#AECFFF] mb-4">
          Our crew of support are standing by for service & support
        </p>

        <div className="space-y-4">
          <div 
            className="bg-[#21477C] p-4 rounded-lg cursor-pointer hover:bg-[#31578F] transition duration-200"
            onClick={goToSupportPage}
          >
            <div className="flex items-center space-x-3">
              <BsFillChatSquareTextFill className="text-[#129B7F] text-xl" />
              <div>
                <p className="font-semibold">Chat with us</p>
                <p className="text-xs text-[#AECFFF]">
                  Start a conversation with our support
                </p>
              </div>
            </div>
          </div>
          <div 
            className="bg-[#21477C] p-4 rounded-lg cursor-pointer hover:bg-[#31578F] transition duration-200"
            onClick={goToSupportPage}
          >
            <div className="flex items-center space-x-3">
              <BsEnvelopeFill className="text-yellow-400 text-xl" />
              <div>
                <p className="font-semibold">Send us an email</p>
                <p className="text-xs text-[#AECFFF]">
                  Send your solution beamed into your email
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={goToSupportPage}
            className="w-full mt-4 bg-gradient-to-r from-[#12B037] to-[#18B451] text-white py-3 rounded-lg hover:opacity-90 transition font-semibold"
          >
            Go to Support Center
          </button>
        </div>
      </div>

      <div className="w-1/2 pl-8 flex flex-col">
        <h1 className="text-2xl font-bold mb-1">Chat with us</h1>
        <h2 className="text-lg font-semibold mb-6">Write us a message</h2>
        <p className="text-sm text-[#AECFFF] mb-4">
          Our crew of support are standing by for service & support
        </p>

        <div className="bg-[#0F294E] p-4 rounded-lg mb-4">
          <p className="text-sm text-[#AECFFF]">
            Click "Go to Support Center" to create a support ticket and track your requests.
          </p>
        </div>

        <div className="mt-auto flex items-center bg-[#21477C] rounded-md px-4 py-3 opacity-50">
          <BsEmojiSmile className="text-xl text-[#AECFFF] mr-3 cursor-pointer" />
          <input
            type="text"
            placeholder="Go to Support Center to send messages"
            className="flex-1 bg-transparent focus:outline-none text-white placeholder-[#AECFFF]"
            disabled
          />
          <button className="ml-3 text-[#129B7F]" disabled>
            <IoIosArrowForward className="text-3xl rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

// About Us View
const AboutUsView = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">About us</h1>
    <p className="text-sm leading-relaxed mb-6 text-[#AECFFF]">
      Your privacy is important to us. It is Brainstorming's policy to respect
      your privacy regarding any information we may collect from you across our{" "}
      <a href="#" className="text-yellow-400 hover:underline">
        website
      </a>
      , and other sites we own and operate.
    </p>

    <div className="flex justify-end space-x-4 mb-6">
      <img src={about_us} alt="" className="h-[20rem]" />
    </div>
    <p className="text-sm leading-relaxed text-[#AECFFF]">
      Your privacy is important to us. It is Brainstorming's policy to respect
      your privacy regarding any information we may collect from you across our{" "}
      <a href="#" className="text-yellow-400 hover:underline">
        website
      </a>
      , and other sites we own and operate.
    </p>
  </div>
);

const VideoQualityView = () => {
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch saved quality from localStorage at component load
  useEffect(() => {
    const savedQuality = localStorage.getItem("videoQuality");
    if (savedQuality) {
      setSelectedQuality(savedQuality);
    }
  }, []);

  const handleQualitySelect = async (quality) => {
    // Avoid duplicate calls if same quality is clicked
    if (quality === selectedQuality) return;

    setSelectedQuality(quality);
    setLoading(true);

    try {
      // Store immediately in localStorage for instant persistence
      localStorage.setItem("videoQuality", quality);

      // Update backend
      await axios.patch(
        `${VITE_SERVER}/user/video-quality`,
        { videoQuality: quality },
        { withCredentials: true }
      );

      console.log("Video quality updated:", quality);
    } catch (error) {
      console.error(
        "Failed to update video quality:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Video Quality</h1>
      {videoQualityOptions.map((quality) => (
        <div
          key={quality.value}
          className="flex justify-between items-center py-4 border-b border-[#21477C] cursor-pointer"
          onClick={() => handleQualitySelect(quality.value)}
        >
          <p className="text-white">{quality.name}</p>
          {selectedQuality === quality.value ? (
            <BsCheckCircleFill className="text-[#129B7F] text-xl" />
          ) : (
            <div className="w-5 h-5 border border-white rounded-full" />
          )}
        </div>
      ))}

      {loading && <p className="text-gray-400 mt-4">Updating...</p>}
    </div>
  );
};

// Placeholder Settings View
const SettingsView = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Settings</h1>
    <p className="text-[#AECFFF]">
      This is the general settings area. You can add options like Notifications,
      Account Security, etc. here.
    </p>
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center py-2 border-b border-[#21477C]">
        <p>Email Notifications</p>
        <input
          type="checkbox"
          className="toggle-switch appearance-none w-10 h-5 rounded-full bg-[#21477C] checked:bg-[#129B7F] transition duration-200 cursor-pointer relative"
        />
      </div>
      <div className="flex justify-between items-center py-2 border-b border-[#21477C]">
        <p>Two-Factor Authentication</p>
        <span className="text-xs font-medium bg-red-600 px-2 py-1 rounded">
          Off
        </span>
      </div>
    </div>
  </div>
);

// Placeholder Delete Account View
const DeleteAccountView = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6 text-red-400">Delete Account</h1>
    <p className="text-red-300 mb-6">
      Warning: Deleting your account is permanent and cannot be undone. All your
      saved data, watch history, and preferences will be lost.
    </p>
    <button className="px-6 py-3 rounded-lg font-semibold text-base bg-red-700 hover:bg-red-800 transition-all">
      Proceed to Delete
    </button>
  </div>
);

// Logout Confirmation Modal
const LogoutModal = ({ onConfirm, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-[#0F294E] p-6 rounded-xl w-full max-w-sm shadow-2xl text-center">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-[#AECFFF] hover:text-white text-xl"
        >
          <AiOutlineClose />
        </button>
        <h3 className="text-xl font-bold mb-6 mt-4">
          Are you sure you want to logout?
        </h3>

        <div className="space-y-4">
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-base ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-800 hover:to-red-600"
            } transition-all shadow-lg`}
          >
            {loading ? "Logging out..." : "Yes, log out"}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 rounded-lg font-semibold text-base bg-[#21477C] hover:bg-[#31578F] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const ProfilePage = () => {
  const nav = useNavigate();
  const [activeView, setActiveView] = useState("Language");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { user } = useUser();

  const handleMenuClick = (component) => {
    if (component === "Logout") {
      setIsLogoutModalOpen(true);
      const userLang = navigator.language || navigator.userLanguage;
      console.log("User language:", userLang);
    } else {
      setActiveView(component);
    }
  };

  const handleLogoutConfirm = () => {
    console.log("User logged out.");
    setIsLogoutModalOpen(false);
    nav("/login");
  };

  const renderView = () => {
    switch (activeView) {
      case "Language":
        return <LanguageView />;
      case "Privacy":
        return <PrivacyView />;
      case "HelpCenter":
        return <HelpCenterView />;
      case "AboutUs":
        return <AboutUsView />;
      case "VideoQuality":
        return <VideoQualityView />;
      case "Settings":
        return <SettingsView />;
      case "DeleteAccount":
        return <DeleteAccountView />;
      default:
        return <LanguageView />;
    }
  };

  return (
    <div className="text-white flex min-h-[90vh] -mx-5 -mt-5 bg-[#0F294E]">
      {/* Sidebar Navigation (Left Column) */}
      <div className="w-72 bg-[#1C365A] p-5 flex flex-col flex-shrink-0">
        {/* Profile Header */}
        <div className="flex items-center space-x-3 pb-6 border-b border-[#21477C] cursor-pointer">
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-[.65rem] text-[#AECFFF]">{user?.email}</p>
          </div>
          <IoIosArrowForward className="text-xl text-[#AECFFF]" />
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-1 flex-1">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                activeView === item.component
                  ? "bg-[#0F294E] text-white font-semibold"
                  : "text-[#AECFFF] hover:bg-[#21477C] hover:text-white"
              }`}
              onClick={() => handleMenuClick(item.component)}
            >
              <item.icon className="text-xl" />
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Content Area (Right Column) */}
      <div className="flex-1">{renderView()}</div>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setIsLogoutModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
