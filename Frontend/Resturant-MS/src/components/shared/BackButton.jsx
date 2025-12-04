import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className='flex items-center justify-center gap-2
      px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-semibold text-white text-base sm:text-lg
      bg-blue-700 hover:bg-blue-600 active:scale-95 transition-all duration-200 ease-in-out
      shadow-md hover:shadow-lg'
    >
      <IoArrowBackOutline className='text-xl sm:text-2xl' />
      <span className='hidden sm:inline'>Back</span>
    </button>
  )
}

export default BackButton
