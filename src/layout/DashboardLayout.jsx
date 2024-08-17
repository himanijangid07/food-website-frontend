import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faHeadset, faTruck, faBoxOpen, faHome, faUser, faCalendarCheck, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from "../components/Modal"
import useAdmin from "../hooks/useAdmin"
import useAuth from '../hooks/useAuth';

const sharedLinks = (
    <>
        <li><Link to="/"><FontAwesomeIcon icon={faHome}/>Home</Link></li>
        <li><Link to="/product"><FontAwesomeIcon icon={faBoxOpen}/>Products</Link></li>
        <li><Link to="/order"><FontAwesomeIcon icon={faTruck}/>Orders Tracking</Link></li>
        <li><Link to="/contact"><FontAwesomeIcon icon={faHeadset}/>Customer Support</Link></li>
    </>
)

const DashboardLayout = () => {
  const {loading} = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  useEffect(() => {
    if (!isAdmin && !isAdminLoading) { // Ensure that loading state is considered
        const modal = document.getElementById('my_modal_3');
        if (modal) {
            modal.showModal();
        }
    }
}, [isAdmin, isAdminLoading]);
  return (
    <div>
      {
        isAdmin ? <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className='flex items-center justify-between mx-4'>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          <FontAwesomeIcon icon={faChartLine}/>
          </label>
          <button className='btn bg-green text-white border-0 rounded-full sm:hidden'><FontAwesomeIcon icon={faUser}/>Logout</button>
          </div>
          {/* This is where nested routes will be rendered */}
          <div className='mt-5 md:mt-2 mx-4'>
          <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-bg text-black min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><Link to='/dashboard' className='flex justify-start mb-3'><p className='text-green text-2xl py-3 font-bold'>Foody</p><div className="badge badge-primary">Admin</div></Link></li>
            <hr className='bg-gray'/>
            <li className='mt-3'><Link to="/dashboard"><FontAwesomeIcon icon={faChartLine}/>Dashboard</Link></li>
            <li className='mt-3'><Link to="/dashboard/manage-bookings"><FontAwesomeIcon icon={faEdit}/>Manage Booking</Link></li>
            <li><Link to="/dashboard/add-items"><FontAwesomeIcon icon={faPlusCircle}/>Add Items</Link></li>
            <li><Link to="/dashboard/manage-items"><FontAwesomeIcon icon={faEdit}/>Manage Items</Link></li>
            <li className='mb-5'><Link to="/dashboard/users"><FontAwesomeIcon icon={faUsers}/>All Users</Link></li>
            <hr />
            {
                sharedLinks
            }
          </ul>
        </div>
      </div> : <Modal/>
      }
    </div>
  );
};

export default DashboardLayout;
