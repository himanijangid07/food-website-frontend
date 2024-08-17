import React from 'react'
import useAuth from "../../../hooks/useAuth"
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2"

const ManageBookings = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {refetch, data:orders = []} = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axiosSecure.get('/payments/all ')
            return response.data;
          },
    })

    const handleConfirm = async (user) => {
         console.log(user);
         await axiosSecure.patch(`/payments/${user._id}`)
         .then (res => {
            console.log(res.data)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment Confirmed ",
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
         })
    }

    console.log(orders);
  return (
    <div className='text-black'>
      <div className='flex items-center justify-between m-4'>
      <h2 className='text-2xl text-black font-lora font-bold my-5'>Manage All <span className='text-green'>Bookings</span></h2>
        <h5>Total Bookings: {orders.length}</h5>
      </div>
      <div>
      <div className="overflow-x-auto">
  <table className="table md:w-[870px]">
    {/* head */}
    <thead className='bg-green text-white rounded-lg'>
      <tr>
        <th>#</th>
        <th>User</th>
        <th>Transaction ID</th>
        <th>Price</th>
        <th>Status</th>
        <th>Confirm Order</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
          orders .map((user, index) => (
              <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.email }</td>
                  <td>{user.transactionId}</td>
                  <td>${user.price}</td>
                  <td>{user.status}</td>
                  <td className='text-center'>
    {user.status === "confirmed" ? (
        <FontAwesomeIcon icon={faCheckCircle} className='text-blue-600'/>
    ) : (
        <button onClick={() => handleConfirm(user)} className="btn btn-ghost btn-xs">
            <FontAwesomeIcon icon={faEdit} className='text-blue-800'/>
        </button>
    )}
</td>
                  <td><button className="btn btn-ghost btn-xs" >
          <FontAwesomeIcon icon={faTrash} className='text-red'/>
          </button></td>
              </tr>
          ))
      }
    </tbody>
  </table>
</div>
      </div>
    </div>
  )
}

export default ManageBookings
