import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { MdTableBar, MdOutlineReorder } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BottomNav = ({ orderId, onUpdateOrder }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", guests: 1 });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increaseGuest = () => handleChange("guests", customer.guests + 1);
  const decreaseGuest = () => handleChange("guests", Math.max(1, customer.guests - 1));

  const isActive = (path) => window.location.pathname === path;

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/order/${orderId}`, {
          withCredentials: true,
        });
        if (res.data?.data?.customerDetails) {
          setCustomer(res.data.data.customerDetails);
          if (onUpdateOrder) onUpdateOrder(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };
    fetchOrder();
  }, [orderId, onUpdateOrder]);


  const handleChange = async (field, value) => {
    const updatedCustomer = { ...customer, [field]: value };
    setCustomer(updatedCustomer);

    if (!orderId) return;

    try {
      const res = await axios.put(
        `http://localhost:8000/api/order/${orderId}`,
        { customerDetails: updatedCustomer },
        { withCredentials: true }
      );
      if (onUpdateOrder) onUpdateOrder(res.data.data);
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  return (
    <>

      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] p-2 flex justify-around items-center sm:justify-evenly flex-wrap gap-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#f5f5f5] text-xs sm:text-sm px-3 py-2 rounded-lg hover:bg-[#2a2a2a] hover:text-[#f6b100] transition-all duration-300"
        >
          <FaHome size={20} /> Home
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-[#f5f5f5] text-xs sm:text-sm px-3 py-2 rounded-lg hover:bg-[#2a2a2a] hover:text-[#f6b100] transition-all duration-300"
        >
          <MdOutlineReorder size={20} /> Orders
        </button>


        <button
          onClick={openModal}
          disabled={isActive("/tables") || isActive("/menu")}
          className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#f6b100] text-[#1a1a1a] rounded-full p-4 sm:p-5 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[0_0_15px_#f6b100] transition-all duration-300"
        >
          <BiSolidDish size={24} />
        </button>

        <button
          onClick={() => navigate("/tables")}
          className="flex items-center gap-2 text-[#f5f5f5] text-xs sm:text-sm px-3 py-2 rounded-lg hover:bg-[#2a2a2a] hover:text-[#f6b100] transition-all duration-300"
        >
          <MdTableBar size={20} /> Tables
        </button>

        <button
          onClick={() => navigate("/more")}
          className="flex items-center gap-2 text-[#f5f5f5] text-xs sm:text-sm px-3 py-2 rounded-lg hover:bg-[#2a2a2a] hover:text-[#f6b100] transition-all duration-300"
        >
          <CiCircleMore size={20} /> More
        </button>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-999 p-4 animate-fadeIn">
          <div className="bg-[#1f1f1f] rounded-2xl w-full max-w-md sm:max-w-lg shadow-2xl border border-[#2a2a2a] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
              <h2 className="text-[#f6b100] text-lg font-semibold">Create Order</h2>
              <button
                onClick={closeModal}
                className="text-[#ababab] hover:text-[#f6b100] text-2xl font-bold transition"
              >
                &times;
              </button>
            </div>


            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Name</label>
                <div className="flex items-center rounded-lg p-3 px-4 bg-[#2a2a2a] hover:bg-[#333] transition-all">
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter customer name"
                    className="bg-transparent flex-1 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Number</label>
                <div className="flex items-center rounded-lg p-3 px-4 bg-[#2a2a2a] hover:bg-[#333] transition-all">
                  <input
                    type="number"
                    value={customer.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+92-9999999999"
                    className="bg-transparent flex-1 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">Guest</label>
                <div className="flex items-center justify-between bg-[#2a2a2a] px-4 py-3 rounded-lg hover:bg-[#333] transition-all">
                  <button onClick={decreaseGuest} className="text-[#f6b100] text-2xl hover:scale-110 transition">&minus;</button>
                  <span className="text-white">{customer.guests} Person</span>
                  <button onClick={increaseGuest} className="text-[#f6b100] text-2xl hover:scale-110 transition">&#43;</button>
                </div>
              </div>

              <button
                onClick={() => navigate("/tables")}
                className="w-full bg-[#f6b100] text-[#1a1a1a] rounded-lg py-3 font-semibold hover:bg-[#ffcc33] transition-all duration-300 mt-4"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
