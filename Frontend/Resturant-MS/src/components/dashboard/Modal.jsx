import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { enqueueSnackbar } from "notistack";

const Modal = ({ setIsTableModalOpen, }) => {
  const [tableData, setTableData] = useState({
    tableNo: "",
    seats: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/table/",
        tableData,
        {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
      );

        enqueueSnackbar("Table added successfully!", { variant: "success" });
        setIsTableModalOpen(false);
    } catch (error) {
      enqueueSnackbar("Failed to add table!", { variant: "error" });
      console.log(error);
    }
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div className="bg-[#262626] p-6 rounded-lg shadow-lg w-96">

        <div className="flex justify-between item-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Table</h2>
          <button
            onClick={() => setIsTableModalOpen(false)}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Table Number
            </label>
            <input
              type="number"
              name="tableNo"
              value={tableData.tableNo}
              onChange={handleInputChange}
              className="bg-[#1f1f1f] p-4 w-full rounded-lg text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Seats
            </label>
            <input
              type="number"
              name="seats"
              value={tableData.seats}
              onChange={handleInputChange}
              className="bg-[#1f1f1f] p-4 w-full rounded-lg text-white outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg py-3 bg-yellow-400 text-black font-bold"
          >
            Add Table
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
