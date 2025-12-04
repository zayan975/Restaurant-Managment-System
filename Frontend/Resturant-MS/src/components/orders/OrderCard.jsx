import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa";

const OrderCard = () => {

  const order = {
    _id: "101",
    customerDetails: { name: "M.Zayan" },
    orderStatus: "Ready",
    items: Array(5).fill("Item"),
    bills: { total: 250, totalWithTax: 275 },
  };

  return (
    <div className="w-[400px] p-4 rounded-lg mb-4 bg-[#2a2a2a] text-white">
      <div className="flex items-center gap-5">
        <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
          {order.customerDetails.name[0]}
        </button>
        <div className="flex flex-col w-full">
          <h1>{order.customerDetails.name}</h1>
          <p>#{order._id} / Dine In</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <p>Total Items: {order.items.length}</p>
          <p>Status: {order.orderStatus}</p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <p className="text-green-500 bg-[#2e4a40] px-2 py-1 rounded text-sm flex items-center">
            <FaCheckDouble className="mr-1" /> Ready
          </p>
          <p className="text-[#ababab] text-sm flex items-center">
            <FaCircle className="mr-1 text-green-500" /> Ready To Serve
          </p>
        </div>
      </div>

      <hr className="border border-gray-500 my-3" />

      <div className="flex justify-between text-lg font-semibold">
        <p>Total</p>
        <p>${order.bills.totalWithTax.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderCard;
