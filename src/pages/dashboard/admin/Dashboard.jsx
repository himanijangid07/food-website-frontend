import React from 'react'
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers, faBoxOpen, faClipboardList} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
    const {refetch, data:stats = []} = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const response = await axiosSecure.get('/adminStats')
            return response.data;
          },
    })

    console.log(stats); 

  return (
    <div className='text-black w-full md:w-[870px] mx-auto px-4'>
      <h2 className='font-semibold text-2xl text-green font-lora my-4 '>Hi, {user.displayName}</h2>
      <div className="stats stats-vertical w-full  lg:stats-horizontal shadow">
  <div className="stat bg-emerald-200 text-black">
  <div className="stat-figure text-green text-2xl">
      <FontAwesomeIcon icon={faDollarSign}/>
    </div>
    <div className="stat-title text-black">Revenues</div>
    <div className="stat-value text-black">${stats.revenue}</div>
    <div className="stat-desc text-black">Jan 1st - Feb 1st</div>
  </div>

  <div className="stat bg-rose-400 ">
  <div className="stat-figure text-green text-2xl">
      <FontAwesomeIcon icon={faUsers}/>
    </div>
    <div className="stat-title text-black">Users</div>
    <div className="stat-value text-black">{stats.users}</div>
    <div className="stat-desc text-black">↗︎ 400 (22%)</div>
  </div>

  <div className="stat bg-indigo-400">
  <div className="stat-figure text-green text-2xl">
      <FontAwesomeIcon icon={faBoxOpen}/>
    </div>
    <div className="stat-title text-black">Product Items</div>
    <div className="stat-value text-black">{stats.productItems}</div>
    <div className="stat-desc text-black">↘︎ 90 (14%)</div>
  </div>

  <div className="stat bg-purple-400"> 
  <div className="stat-figure text-green text-2xl">
      <FontAwesomeIcon icon={faClipboardList}/>
    </div>
    <div className="stat-title text-black">All Orders </div> 
    <div className="stat-value text-black">{stats.orders}</div>
    <div className="stat-desc text-black">↘︎ 90 (14%)</div>
  </div>
    
</div>
    </div>
  )
}

export default Dashboard
