import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const Profile = ({user}) => {
  const {logOut} = useContext(AuthContext)

  const handleLogout = () => {
    logOut().then(() => {
      console.log("logout successful");
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className='bg-white'>
      <div className="drawer drawer-end z-50 bg-white">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {
            user.photoURL ? <img
            alt="Tailwind CSS Navbar component"
            src={user.photoURL} /> : <img 
            alt='Tailwind CSS Navbar Component
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            '/>
          }
        </div>
      </div>
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay draw"></label>
    <ul className="menu bg-white text-black min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><Link to='/update-profile'>Profile</Link></li>
            <li><a href='/order'>Orders</a></li>
            <li><a>Settings</a></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
    </ul>
  </div>
</div>
    </div>
  )
}

export default Profile
