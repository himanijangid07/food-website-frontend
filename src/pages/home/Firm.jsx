import React from 'react'
import {Link} from "react-router-dom"

const Firm = () => {
  return (
    <div className='flex flex-wrap justify-center bg-green items-center py-24 mt-10 bg-second bg-cover bg-center h-screen-50 w-full'>
      <div>
        <h1 className='title text-white pl-8'>Visit Our Firm</h1>
        <p className='text-white w-3/4 pl-8 pt-7'>Visit our firm to discover a world of fresh, organic produce and experience our commitment to quality and sustainability firsthand.</p>
      </div>
      <div>
        <Link to='/contact'>
        <button className='bg-orange p-3 px-8 rounded-full text-white mt-10'>Visit Now</button>
        </Link>
      </div>
    </div>
  )
}

export default Firm
