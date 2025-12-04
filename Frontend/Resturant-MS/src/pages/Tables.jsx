import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import Modal from "../components/dashboard/Modal";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");
  const [tables, setTables] = useState([]);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const userRole = localStorage.getItem("role"); // admin check

  useEffect(() => {
    document.title = "POS | Tables";
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/table/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTables(res.data.data);
    } catch (error) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
      console.log(error);
    }
  };

  const filteredTables =
    status === "booked"
      ? tables.filter((t) => t.status === "Booked")
      : tables;

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#252525] shadow-md">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>

        {userRole === "admin" && (
          <button
            onClick={() => setIsTableModalOpen(true)}
            className="bg-yellow-400 px-5 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Add Table
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => setStatus("all")}
          className={`text-[#ccc] text-lg px-4 py-2 rounded-lg font-semibold ${
            status === "all" && "bg-[#383838] text-white"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setStatus("booked")}
          className={`text-[#ccc] text-lg px-4 py-2 rounded-lg font-semibold ${
            status === "booked" && "bg-[#383838] text-white"
          }`}
        >
          Booked
        </button>
      </div>

      {/* Cards Grid */}
      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-5 
          px-6 
          py-4 
          overflow-y-auto
        "
        style={{ maxHeight: "calc(100vh - 170px)" }} // header + filter + bottom nav space
      >
        {filteredTables.map((table) => (
          <TableCard
            key={table._id}
            id={table._id}
            name={table.tableNo}
            status={table.status}
            initials={table?.currentOrder?.customerDetails?.name}
            seats={table.seats}
          />
        ))}
      </div>

      {isTableModalOpen && (
        <Modal setIsTableModalOpen={setIsTableModalOpen} onTableAdded={fetchTables} />
      )}

      <BottomNav />
    </section>
  );
};

export default Tables;
