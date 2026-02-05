import React, { useState, useRef, useEffect } from "react";
import profileImg from "../assets/profile.png";
import { IoIosSearch } from "react-icons/io";
import { useAuth } from "../auth/useAuth";

const Navbar = ({ isCollapsed }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    // Optionally, navigate to login page here if needed
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 h-16 bg-white text-black flex items-center justify-between px-6 transition-all duration-300 ${
        isCollapsed ? "left-20 w-[calc(100%-80px)]" : "left-60 w-[calc(100%-240px)]"
      }`}
    >
      <div className="w-1/2 flex items-center space-x-1">
        <input
          type="text"
          className="border w-full p-1.5 rounded outline-none"
          placeholder="I am looking for.."
        />
        <button className="bg-primary text-white p-2 rounded">
          <IoIosSearch size={20} />
        </button>
      </div>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center space-x-4 cursor-pointer select-none"
          onClick={toggleDropdown}
          title={'logged in as '+user.role}
        >
          <img src={profileImg} alt="Profile" className="w-12 h-12 rounded-full" />
          <div>
            <p className="text-sm font-semibold">{user ? user.email : "Guest"}</p>
            <p className="text-sm font-semibold text-gray-600 capitalize">+254709956035</p>
            {/* <p className="text-sm font-semibold text-gray-600 capitalize">Logged in as {user ? user.role : ""}</p> */}
          </div>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
