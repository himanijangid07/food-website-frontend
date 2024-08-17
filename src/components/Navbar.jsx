import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const {user, loading} = useAuth();
   console.log(user);

  const [cart, refetch] = useCart();
  console.log(cart);

   useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if(offset > 0) {
        setSticky(true);
      }
      else {
        setSticky(false);
      }
    };
  window.addEventListener('scroll', handleScroll);

  return () => {
    window.addEventListener('scroll', handleScroll);
  }
 }, []);
    const navItems = 
    <>
    <li><a href='/' className='text-b'>Home</a></li>
      <li><a href='/about' className='text-b'>About Us</a></li>
      <li><a href='/product' className='text-b'>Products</a></li>
      <li>
        <details>
          <summary className='text-b'>Pages</summary>
          <ul className="p-2">
            <li><a href='/blog'>Blog Grid</a></li>
            <li><a href='/'>Our Features</a></li>
            <li><a href='/'>Our Testimonials</a></li>
          </ul>
        </details>
      </li>
      <li><a href='/contact' className='text-b'><FontAwesomeIcon icon={faPhone}/>Contact Us</a></li>
    </>
  return (
    <header className='bg-white text-gray max-w-screen-2xl container mx-auto'>
<div className="navbar xl:px-24">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {navItems}
      </ul>
    </div>
    <a className="btn btn-ghost text-2xl font-lora text-green">Foody</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItems}
    </ul>
  </div>
  <div className="navbar-end">
    <Link to="/cart-page">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-3 lg:flex justify-center items-center">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item bg-white border-0">{cart.length || 0}</span>
        </div>
      </div>
    </Link>
{
  user? <Profile user={user }/> :
    <button onClick={()=>document.getElementById('my_modal_3').showModal()} className="btn bg-green text-white border-0 text-xl rounded-full">
        <FontAwesomeIcon icon={faUser}/>
        Log In
    </button>
}
      <Modal/>
  </div>
</div>
    </header>
    
  )
}

export default Navbar
