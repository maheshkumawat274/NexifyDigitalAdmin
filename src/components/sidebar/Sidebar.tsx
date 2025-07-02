import React, { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 text-white bg-gray-800"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-gray-900 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div className="p-4 text-2xl font-bold bg-white border-b border-gray-700">
          <div className=" flex justify-center items-center gap-3 h-7 mt-2 w-48">
          <div className="flex items-center gap-2" aria-label="Nexify Digital Home">
            <img 
              src="/imgs/logo.png"
              alt="Nexify Digital Logo"
            />
            <div></div>
          </div>
        </div>
        </div>
        <nav className="p-4 space-y-2">
          <p className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaHome /> Dashboard
          </p>
          <p className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaUser /> Users
          </p>
           <Link to='/contacts'>
            <p className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaUser /> Form data
          </p>
           </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
