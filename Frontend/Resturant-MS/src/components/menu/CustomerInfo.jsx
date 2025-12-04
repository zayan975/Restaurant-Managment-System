import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerInfo = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({ name: "", phone: "", guests: 1 });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) return;
        const res = await axios.get(`http://localhost:8000/api/order/${orderId}`, { withCredentials: true });
        setOrder(res.data.data);
        setCustomerDetails(res.data.data.customerDetails || { name: "", phone: "", guests: 1 });
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleChange = async (field, value) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
    try {
      await axios.put(
        `http://localhost:8000/api/order/${orderId}`,
        { customerDetails: { ...customerDetails, [field]: value } },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error updating customer info:", err);
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-[#1a1a1a] rounded-lg text-white space-y-4">
      <input
        type="text"
        value={customerDetails.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Customer Name"
        className="w-full p-3 bg-[#2a2a2a] rounded-lg text-white"
      />
      <input
        type="text"
        value={customerDetails.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        placeholder="Phone"
        className="w-full p-3 bg-[#2a2a2a] rounded-lg text-white"
      />
      <div className="flex items-center gap-4">
        <button onClick={() => handleChange("guests", Math.max(1, customerDetails.guests - 1))}>−</button>
        <span>{customerDetails.guests} Person</span>
        <button onClick={() => handleChange("guests", customerDetails.guests + 1)}>+</button>
      </div>
    </div>
  );
};

export default CustomerInfo;
