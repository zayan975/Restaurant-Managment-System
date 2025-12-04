import React from "react";
import { useNavigate } from "react-router-dom";

const getRandomBg = () => {
  const colors = [
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const TableCard = ({ id, name, status, seats, initials }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "Booked") return; 
    navigate("/menu", { state: { tableId: id, tableNo: name } });
  };

  return (
    <div
      onClick={handleClick}
      style={{ backgroundColor: getRandomBg() }}
      className="
        p-4 
        rounded-xl 
        shadow-md 
        text-white
        cursor-pointer 
        transition-transform 
        hover:scale-105 
        h-[130px] 
        flex 
        flex-col 
        justify-between
      "
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold">T-{name}</h2>
        <span className="text-xs bg-black/20 px-2 py-2 rounded-md">
          {status}
        </span>
      </div>

      <p className="text-sm opacity-90">Seats: {seats}</p>

      {initials && (
        <p className="text-sm mt-1 opacity-80 truncate">{initials}</p>
      )}
    </div>
  );
};

export default TableCard;
