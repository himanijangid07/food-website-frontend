/* eslint-disable react/prop-types */
import React from 'react'

const Cards = ({item}) => {
  return (
    <div className='pb-20'>
      <div className="card bg-green w-96 shadow-xl ml-20">
  <div className="card-body text-white">
    <h2 className="card-title">{item.name}</h2>
    <p>{item.content}</p>
  </div>
  <figure>
    <img
      src={item.image}
      alt="" className='rounded-full mb-10'/>
  </figure>
</div>
    </div>
  )
}

export default Cards
