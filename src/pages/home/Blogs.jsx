import React from 'react'

const Blogs = () => {
  return (
    <div className='mt-10 lg:mx-20 mx-10 pb-10'>
      <h1 className='title text-black text-center text-2xl font-bold font-lora'>Latest Blogs</h1>
      <p className='text-center mt-4'>Check out our latest blog for fresh insights and tips on making the most of your organic produce.</p>
      <div className='flex flex-col sm:flex-row justify-evenly items-center mt-20 gap-10'>
        <div className='w-full sm:w-1/3 mb-10 sm:mb-0 blog'>
          <img src="/blog-1.jpg" alt="Blog 1" className='w-full h-auto'/>
          <h2 className='text-black font-serif text-xl font-bold mt-4 p-5'>How to cultivate organic fruits and vegetables in your own farm</h2>
        </div>
        <div className='w-full sm:w-1/3 mb-10 sm:mb-0 blog'>
          <img src="/blog-2.jpg" alt="Blog 2" className='w-full h-auto'/>
          <h2 className='text-black font-serif text-xl font-bold mt-4 p-5'>Harvesting Health: Top Benefits of Eating Fresh, Organic Produce</h2>
        </div>
        <div className='w-full sm:w-1/3 blog'>
          <img src="/blog-3.jpg" alt="Blog 3" className='w-full h-auto'/>
          <h2 className='text-black font-serif text-xl font-bold mt-4 p-3'>From Farm to Table: How Direct Sourcing Enhances Your Food Experience</h2>
        </div>
      </div>
    </div>
  )
}

export default Blogs
