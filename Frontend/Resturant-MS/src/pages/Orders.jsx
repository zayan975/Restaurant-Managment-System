import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import OrderCard from '../components/orders/OrderCard'
import BackButton from '../components/shared/BackButton'

const Orders = () => {
  const [status, setstatus] = useState("all")

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-10 py-4 gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">Orders</h1>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
          {["all", "progress", "ready", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setstatus(s)}
              className={`text-[#ababab] text-sm sm:text-lg rounded-lg px-4 py-2 font-semibold transition-all duration-300 hover:bg-[#2a2a2a] hover:text-[#f6b100] active:scale-95
              ${status === s ? "bg-[#383838] text-[#f6b100]" : ""}`}
            >
              {s === "all" ? "All" : s === "progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className='px-10 py-4 flex flex-wrap gap-6 items-center  no-scrollbar overflow-y-scroll h-[calc(100vh-5rem-5rem)]'>
        {Array.from({ length: 14 }).map((_, i) => (
          <OrderCard key={i} />
        ))}
      </div>

      <BottomNav />
    </section>
  )
}

export default Orders
