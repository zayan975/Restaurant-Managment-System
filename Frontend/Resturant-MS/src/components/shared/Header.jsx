import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/images/Rs-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const [userData, setUserData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const user = localStorage.getItem("user");
      setUserData(user ? JSON.parse(user) : {});
    };

    loadUser();
    window.addEventListener("userUpdated", loadUser);
    return () => window.removeEventListener("userUpdated", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userUpdated"));
    setDropdownOpen(false);
    navigate("/login"); 
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center py-4 px-6 bg-[#1a1a1a] flex-wrap gap-4"
    >
     
      <div className="flex items-center gap-2">
        <img src={logo} className="h-8 w-8" alt="restro logo" />
        <h1 onClick={() => navigate("/")} className="text-lg font-semibold text-white cursor-pointer">Restro</h1>
      </div>

     
      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-full sm:w-[400px]">
        <FaSearch className="text-white" />
        <input type="text" placeholder="Search" className="bg-transparent outline-none text-white w-full" />
      </div>

    
      <div className="flex items-center gap-4 relative">
      {userData.role?.toLowerCase() === "admin" && (
  <div onClick={() => navigate("/dashboard")} className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
    <MdDashboard className="text-white text-2xl" />
  </div>
)}

        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-white text-2xl" />
        </div>
       

        {userData?.name ? (
          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle className="text-white text-4xl" />
              <div>
                <h1 className="text-white font-semibold">{userData.name}</h1>
                <p className="text-gray-400 text-xs">{userData.role}</p>
              </div>
            </div>

          
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1f1f1f] rounded-lg shadow-lg flex flex-col">
                <button
                  className="px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg text-left"
                  onClick={() => {
                    navigate("/profile"); 
                    setDropdownOpen(false);
                  }}
                >
                  Profile
                </button>
                <button
                  className="px-4 py-2 text-white hover:bg-gray-700 rounded-b-lg text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth">
            <button className="bg-white text-black px-5 py-2 rounded-lg font-semibold">Signup</button>
          </Link>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
