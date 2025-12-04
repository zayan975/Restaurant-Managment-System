import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EmployeeRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed!", { position: "top-center" });
        return;
      }

      toast.success("Employee Registered Successfully!", { position: "top-center" });


      if (data.data) {
        localStorage.setItem("user", JSON.stringify(data.data));
        window.dispatchEvent(new Event("userUpdated"));
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("tokenUpdated"));


      setForm({ name: "", email: "", phone: "", password: "", role: "" });


      setTimeout(() => navigate("/", { replace: true }), 1000);

    } catch (error) {
      toast.error("Server Error!", { position: "top-center" });
    }
  };


  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')" }}>
      <ToastContainer />
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-[#f6b100]">
        <h2 className="text-2xl font-bold text-[#f6b100] text-center mb-6">Employee Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={form.name} placeholder="Employee Name"
            className="w-full p-3 border border-[#f6b100] rounded-lg" onChange={handleChange} required />
          <input type="email" name="email" value={form.email} placeholder="Email"
            className="w-full p-3 border border-[#f6b100] rounded-lg" onChange={handleChange} required />
          <input type="text" name="phone" value={form.phone} placeholder="Phone Number"
            className="w-full p-3 border border-[#f6b100] rounded-lg" onChange={handleChange} required />
          <input type="password" name="password" value={form.password} placeholder="Password"
            className="w-full p-3 border border-[#f6b100] rounded-lg" onChange={handleChange} required />
          <select name="role" value={form.role} className="w-full p-3 border border-[#f6b100] rounded-lg"
            onChange={handleChange} required>
            <option value="" disabled>Select Role</option>
            <option value="waiter">Waiter</option>
            <option value="cashier">Cashier</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="w-full bg-[#f6b100] text-white p-3 rounded-lg font-semibold">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-[#f6b100] font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default EmployeeRegister;
