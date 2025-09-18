"use client"
import React from 'react'

const Home = () => {
  
  return (
    <div>
      <button onClick={() => window.location.href = '/auth/login'} className='bg-[#29903B] border-2 rounded-2xl p-2 m-4 text-white font-medium'>Login</button>
      <button onClick={() => window.location.href = '/auth/sign-up'} className='bg-[#29903B] border-2 rounded-2xl p-2 m-4 text-white font-medium'>Sign Up</button>
    </div>
  )
}

export default Home