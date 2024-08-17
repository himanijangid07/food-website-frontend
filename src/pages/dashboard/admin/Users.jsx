import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure();
    const {refetch, data:users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users')
            return response.data;
          },
    })
    // const isAdmin = false; 
    // console.log(users);

    const handleMakeAdmin = user => {
      axiosSecure.patch(`/users/admin/${user._id }`).then (res => {
        alert(`${user.name} is now an admin`);
        refetch();
      }) 
    }

    const handleDeleteUser = user => {
      axiosSecure.delete(`/users/${user._id}`).then (res => {
        alert(`${user.name} is now removed from database`);
        refetch();
      })
    }
  return (
    <div className='text-black'>
      <div className='flex items-center justify-between m-4'>
      <h2 className='text-2xl text-black font-lora font-bold my-5'>Manage All <span className='text-green'>Users</span></h2>
        <h5>Total Users: {users.length}</h5>
      </div>
      <div>
      <div className="overflow-x-auto">
  <table className="table md:w-[870px]">
    {/* head */}
    <thead className='bg-green text-white rounded-lg'>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
          users.map((user, index) => (
              <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td> {
                    user.role === 'admin' ? "Admin" : (
                      <button onClick={() => handleMakeAdmin(user )} className="btn btn-ghost btn-xs btn-circle text-white bg-indigo-600">
                        <FontAwesomeIcon icon={faUsers}/>
                      </button>
                    )}
                  </td>
                  <td><button className="btn btn-ghost btn-xs" onClick={() => handleDeleteUser(user)}>
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

export default Users
