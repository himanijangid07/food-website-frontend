import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className='section-container'>
      <div className='py-24 flex flex-col md:flex-row justify-between items-center gap-8'>
        <div className='md:w-1/2 space-y-7 px-4'>
            <img src="/about.jpg" alt="" />
        </div>
        <div className='md:w-1/2 ml-4'>
            <h1 className='title'>Best Organic Fruits and Vegetables</h1>
            <p className='para'>Foody offers the finest organic fruits and vegetables, sourced directly from farms. By eliminating middlemen, we ensure the freshest produce and the best prices, making us the top choice for quality and value.</p>
            <ul>
                <li className='mt-5 text-gray'><FontAwesomeIcon icon={faCheck} style={{color: "#3cb815", marginRight: "10px"}} />Freshness Guaranteed</li>
                <li className='mt-5 text-gray'><FontAwesomeIcon icon={faCheck} style={{color: "#3cb815", marginRight: "10px"}} />Support for Local Farmers</li>
                <li className='mt-5 text-gray'><FontAwesomeIcon icon={faCheck} style={{color: "#3cb815", marginRight: "10px"}} />Transparency and Trust</li>
            </ul>
            <button className='mt-6 bg-green p-3 rounded-full px-8 text-white'>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default About
