import React from 'react'

const Banner = () => {
  return (
    <div className='section-container bg-first bg-cover bg-center h-screen-100 w-full'>
      <div className='py-24 flex flex-col md:flex-row justify-between items-center gap-8'>
        <div className='md:w-1/2 space-y-7 px-4'>
            <h1 className='lg:text-5xl text-3xl text-black font-bold md:leading-snug leading-snug font-lora pt-18'>Natural Food is Always Healthy</h1>
                <button className='bg-green p-4 mr-5 mt-5 rounded-full text-white px-10'>Products</button>
                <button className='bg-orange p-4 rounded-full text-white px-10'>Services</button>
        </div>
        <div className='md:w-1/2'>
        </div>
      </div>
    </div>
  )
}

export default Banner
