import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed!", { position: "top-center" });
        return;
      }

      toast.success("Login Successful!", { position: "top-center" });


      if (data.data) {
        localStorage.setItem("user", JSON.stringify(data.data));
        window.dispatchEvent(new Event("userUpdated"));
      }

      if (data.token) localStorage.setItem("token", data.token);

      setForm({ email: "", password: "" });
      setTimeout(() => navigate("/"), 1200);

    } catch (error) {
      toast.error("Server Error!", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')" }}>
      <ToastContainer />
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-[#f6b100]">
        <h2 className="text-2xl font-bold text-[#f6b100] text-center mb-6">Employee Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" value={form.email} placeholder="Email"
            className="w-full p-3 border border-[#f6b100] rounded-lg" onChange={handleChange} required />
          <input type="password" name="password" value={form.password} placeholder="Password"
            className="w-full p-3 border border-[#f6b100] rounded-lg" onChange={handleChange} required />
          <button type="submit" className="w-full bg-[#f6b100] text-white p-3 rounded-lg font-semibold">Login</button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account? <a href="/auth" className="text-[#f6b100] font-semibold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default EmployeeLogin;
