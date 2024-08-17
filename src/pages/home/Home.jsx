import React from 'react'
import Banner from "../../components/Banner"
import About from "./About"
import Features from './Features.jsx'
import Products from './Products.jsx'
import Firm from './Firm.jsx'
import Reviews from './Reviews.jsx'
import Blogs from './Blogs.jsx'

const Home = () => {
  return (
    <div>
      <Banner/>
      <About/>
      <Features/>
      <Products/>
      <Firm/>
      <Reviews/>
      <Blogs/>
    </div>
  )
}

export default Home
