"use client"
import React from 'react'
import HeroSection from '@/section/herosection'
import SecondPage from '@/components/secondPage'

const Home = () => {
  
  return (
  <div>
    <div className='min-h-screen'>
    <HeroSection/>
    </div>
    <div className='min-h-screen'>
    <SecondPage/>
    </div>
  </div>
  )
}

export default Home