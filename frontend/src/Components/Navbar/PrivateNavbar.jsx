import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo3.png";
import { IoMdCart } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";

const PrivateNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Home", "About", "Services", "Contact"];

  return (
    <nav className="bg-[#1B1107] p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="h-10 mr-3 rounded-full" />
          </Link>
          <span className="text-white text-xl font-bold">
            <Link to={"/"}>CoffeeShop</Link>
          </span>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-white hover:text-gray-400"
            >
              {item}
            </Link>
          ))}
          <button
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-full"
            // onClick={logoutHandler}
          >
            <CgProfile />
          </button>
          <Link
            to="/login"
            className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-full"
          >
            <IoMdCart />
          </Link>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="flex items-center justify-center text-white mb-4 hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="flex flex-row justify-around">
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-full"
              // onClick={logoutHandler}
            >
              <CgProfile />
            </button>
            <Link
              to="/profile"
              className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoMdCart />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PrivateNavbar;
