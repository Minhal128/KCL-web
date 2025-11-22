import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="px-4 sm:px-6 lg:px-8 pt-4 text-[#fff] flex items-start md:items-center justify-center md:flex-row flex-col">
      <div className="flex items-center justify-between w-[100%] md:w-[60%] py-2 px-4 rounded-3xl shadow-2xl bg-[#193967]">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Qosyne Logo" className="h-10" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <p className="hover: transition">Movies</p>
          <p className="hover: transition">Tv Series</p>
          <p className="hover: transition">Support</p>
          <p className="hover: transition">Contact</p>
        </div>

        <Link to={"/login"}>
          <button className="bg-[#fff] shadow-2xl w-[144px] h-[40px] rounded-3xl text-black hidden md:block">
            Sign in
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl  focus:outline-none">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <div className="w-[10rem] rounded-3xl shadow-2xl bg-[#193967] h-[47px] py-2 ml-5 hidden md:flex justify-center items-center gap-x-3">
        <img
          className="w-[1.6rem] h-[1.6rem] rounded-full"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1280px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"
          alt=""
        />
        <p className="text-[#8C8FA8]">English</p>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 py-2 px-4  shadow-2xl bg-[#193967] w-full rounded-md">
          <p className="hover: transition">Movies</p>
          <p className="hover: transition">Tv Series</p>
          <p className="hover: transition">Support</p>
          <p className="hover: transition">Contact</p>
          <Link to={"/login"}>
            <p className="hover: transition">Login</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
