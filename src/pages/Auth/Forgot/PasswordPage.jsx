import moview_bg from "../../../assets/auth/moview_bg.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { VITE_SERVER } from "../../../constants/config.js";

const PasswordPage = () => {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing token. Please try resetting again.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${VITE_SERVER}/auth/reset-password`, {
        token,
        newPassword: password,
      });

      alert(res.data.message || "Password reset successful!");
      nav("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ background: `url(${moview_bg})` }}
      className="flex justify-center items-center w-screen h-screen bg-cover bg-center"
    >
      <div className="bg-[#112F5A] bg-opacity-90 rounded-md w-[90%] sm:w-[500px] p-8 md:p-12 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => nav("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-white text-2xl font-medium text-center mb-2">
          Set a New Password
        </h2>
        <p className="text-center text-[#C5DDFF] text-sm mb-6">
          Choose a secure password that’s at least 8 characters long
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#12B037]" />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#112F5A] border border-gray-600 rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-[#12B037] placeholder-gray-400 text-white"
              required
            />
          </div>

          <div className="relative">
            <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#12B037]" />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#112F5A] border border-gray-600 rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-[#12B037] placeholder-gray-400 text-white"
              required
            />
          </div>

          {error && <p className="text-red-400 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#12B037] to-[#18B451] text-white py-3 rounded-full text-md font-medium shadow-[0_11px_29px_0_rgba(20,169,144,0.3)] hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPage;
