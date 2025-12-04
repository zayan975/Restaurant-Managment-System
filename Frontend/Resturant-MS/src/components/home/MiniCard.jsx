import React from 'react'

const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div className='bg-[#1a1a1a] py-5 px-5 rounded-lg w-full sm:w-[48%] lg:w-[30%] transition-all duration-300 hover:scale-105'>
      <div className='flex items-start justify-between'>
        <h1 className='text-[#f5f5f5] text-base sm:text-lg font-semibold tracking-wide'>
          {title}
        </h1>
        <button
          className={`${
            title === "Total Earnings" ? "bg-[#02ca3a]" : "bg-[#f6b100]"
          } p-2 sm:p-3 rounded-lg text-[#f5f5f5] text-lg sm:text-2xl`}
        >
          {icon}
        </button>
      </div>

      <div className='mt-4'>
        <h1 className='text-[#f5f5f5] text-2xl sm:text-4xl font-bold'>{title === "Total Earnings" ? `${number}` : number}</h1>
        <h2 className='text-[#f5f5f5] text-sm sm:text-lg mt-1 sm:mt-2'>
          <span className='text-[#02ca3a]'>{footerNum}%</span>
        </h2>
      </div>
    </div>
  )
}

export default MiniCard
