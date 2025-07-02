import React, { useState } from "react";
import { FaBell, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold"></h1>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="text-xl hover:text-yellow-400 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notification Icon */}
        <button className="relative text-xl hover:text-blue-400 transition" title="Notifications">
          <FaBell />
          <span className="absolute top-[-4px] right-[-4px] bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="relative group">
          <button className="text-2xl hover:text-green-400 transition" title="Profile">
            <FaUserCircle />
          </button>
          {/* Dropdown on hover */}
          <div className="absolute right-0 hidden group-hover:block bg-white text-black rounded shadow-lg w-32 z-50">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
