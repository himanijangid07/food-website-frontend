import React from 'react';

const featureList = [
    {id: 1, title: "Natural Process", des: "Embracing nature's rhythms, our produce grows through natural processes, ensuring purity and sustainability in every bite.", image: "/images/icon-1.png", button: "Read More"},
    {id: 2, title: "Organic Products", des: "Experience the pure goodness of organic products, cultivated without synthetic chemicals for a healthier lifestyle.", image: "/images/icon-2.png", button: "Read More"},
    {id: 3, title: "Biologically Safe", des: "Our biologically safe products are crafted with care, free from harmful chemicals, ensuring health and peace of mind for you.", image: "/images/icon-3.png", button: "Read More"},
];

const Features = () => {
  return (
    <div className='section-container bg-second bg-cover bg-center h-inherit w-full features pt-24 text-center pb-10'>
        <div>
            <h1 className='title'>Our Features</h1>
            <p className='para'>Our commitment to quality ensures fresh, organic produce, direct farm sourcing, fair prices, and unparalleled transparency, making us your trusted choice for healthy eating.</p>
        </div>
        {/* <div className='cards'>
            {
                featureList.map((feature, i) => (
                    <div className='bg-white' key={i}>
                        <div>
                            <img src={feature.image} className='w-full'/>
                        </div>
                        <div className='mt-5 space-y-1'>
                            <h3 className='lg:text-f font-lora'>{feature.title}</h3>
                            <p className='para'>{feature.des}</p>
                            <button className='p-3 px-7 border border-green rounded-full text-green'>{feature.button}</button>
                        </div>
                    </div>
                ))
            }
        </div> */}

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
  )
}

export default Features
