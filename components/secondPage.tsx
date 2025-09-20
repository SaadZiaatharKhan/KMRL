import React from 'react'
import Image from 'next/image'

const secondPage = () => {
  return (
    <div className=''>
      <div className='flex justify-center '>
      <h1 className='text-6xl p-6 tracking-tight font-extrabold text-[#00B2FF] animate-fade-in-up drop-shadow-lg'>What We Offer</h1>
      </div>
      <div>
        <div>
          <Image alt='image' src={"/images/1.png"}></Image>
          <h2></h2>
        </div>
        <div>
           <Image></Image>
          <h2></h2>
        </div>
        <div>
           <Image></Image>
          <h2></h2>
        </div>
        <div>
           <Image></Image>
          <h2></h2>
        </div>
      </div>
    </div>
  )
}

export default secondPage