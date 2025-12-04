import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'

const OrderList = () => {
  return (
    
    <div className='flex items-center gap-4 mb-3 p-3 rounded-xl transition-all duration-300 hover:bg-[#2a2a2a] hover:scale-[1.02] cursor-pointer sm:flex-row flex-col sm:items-center'>
      <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg sm:w-auto w-full text-center hover:bg-[#ffcc33] transition-colors duration-200'>
        MZ
      </button>

      <div className='flex sm:flex-row flex-col items-start sm:items-center justify-between w-full gap-3'>
        <div> 
          <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>M.Zayan</h1>
          <p className='text-[#ababab] text-sm'>8 Items</p>
        </div>

        <div>
          <h1 className='text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-2 hover:bg-[#f6b100] hover:text-black transition-all duration-200'>
            Table No: 5
          </h1>
        </div>

        <div className='flex flex-col items-start gap-2'>
          <p className='text-green-600 px-2 text-sm sm:text-base'>
            <FaCheckDouble className='inline mr-2'/> Ready
          </p>
          <p className='text-[#ababab] text-sm'>
            <FaCircle className='inline mr-2 text-green-600'/> Ready To Serve
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderList
