import React, { useState, useEffect } from "react";

const Greetings = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const loadUser = () => {
      const user = localStorage.getItem("user");
      setUserData(user ? JSON.parse(user) : {});
    };

    loadUser();
    window.addEventListener("userUpdated", loadUser);
    return () => window.removeEventListener("userUpdated", loadUser);
  }, []);

  const formatDate = (date) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
  };

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 sm:px-10 py-5 mt-3 bg-[#1E1E1E] rounded-2xl shadow-md">


      <div className="mb-4 sm:mb-0">
        <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-semibold tracking-wide">
          Good Morning, {userData.name || "Guest"}
        </h1>
        <p className="text-[#b5b5b5] text-sm sm:text-base">
          Give your best services for customers
        </p>
      </div>


      <div className="text-[#f5f5f5] text-right bg-[#2a2a2a] px-4 py-2 rounded-lg shadow-inner">
        <h1 className="text-lg sm:text-xl font-medium">{formatTime(dateTime)}</h1>
        <p className="text-[#ababab] text-sm">{formatDate(dateTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;
