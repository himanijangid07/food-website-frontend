import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom"

const featureList = [
  {id: 1, title: "Natural Process", des: "Embracing nature's rhythms, our produce grows through natural processes, ensuring purity and sustainability in every bite.", image: "/images/icon-1.png", button: "Read More"},
  {id: 2, title: "Organic Products", des: "Experience the pure goodness of organic products, cultivated without synthetic chemicals for a healthier lifestyle.", image: "/images/icon-2.png", button: "Read More"},
  {id: 3, title: "Biologically Safe", des: "Our biologically safe products are crafted with care, free from harmful chemicals, ensuring health and peace of mind for you.", image: "/images/icon-3.png", button: "Read More"},
];

const AboutUs = () => {
  return (
    <div>
      <div className='py-24 h-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 section-container bg-first bg-cover bg-center w-full'>
        <div className='md:w-1/2 px-4'>
            <h1 className='lg:text-5xl text-3xl font-bold md:leading-snug leading-snug font-lora pt-0 md:pt-18'>
              About
            </h1>
        </div>
        <div className='md:w-1/2'>
        </div>
      </div>
      <div className="section-container">
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
    <div className='section-container bg-second bg-cover bg-center h-inherit w-full features pt-24 text-center pb-10'>
        <div>
            <h1 className='title'>Our Features</h1>
            <p className='para'>Our commitment to quality ensures fresh, organic produce, direct farm sourcing, fair prices, and unparalleled transparency, making us your trusted choice for healthy eating.</p>
        </div>
        <div className="flex flex-wrap mt-5 h-80 pb-10">
                {featureList.map((feature, i) => (
                    <div key={i} className="w-full sm:w-1/2 lg:w-1/3 p-4 text-center">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden images">
                            <img src={feature.image} alt={feature.title} className="w-30 p-10 lg:ml-24 sm: ml-16" />
                        <div className="p-4">
                            <h3 className="text-f font-bold font-lora">{feature.title}</h3>
                            <p className="text-gray-600 para">{feature.des}</p>
                            <button className='border-2 border-green p-3 px-7 rounded-full m-5 text-green font-sans'>{feature.button}</button>
                        </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    </div>
  )
}

export default AboutUs;
