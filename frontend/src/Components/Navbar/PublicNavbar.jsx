import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo3.png";

const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Home", "About", "Services", "Contact"];

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 mr-3 rounded-full" />
          <span className="text-white text-xl font-bold">CoffeeShop</span>
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
          <div className="flex space-x-4 items-center justify-center text-center">
            <Link
              to="/login"
              className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center justify-center text-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block text-white hover:text-gray-400 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="flex space-x-4 items-center justify-around text-center">
            <Link
              to="/login"
              className="block text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/login"
              className="block text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
