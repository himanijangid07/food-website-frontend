// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../hooks/useAuth';
// import { Link } from 'react-router-dom';

// const Order = () => {
//     const { user } = useAuth(); // Make sure to call the hook as a function
//     const token = localStorage.getItem('access-token');
    
//     const { refetch, data: orders = [] } = useQuery({
//         queryKey: ['orders', user?.email],
//         queryFn: async () => {
//             const response = await fetch(`http://localhost:6003/payments?email=${user?.email}`, {
//                 headers: {
//                     authorization: `Bearer ${token}`
//                 }
//             });
//             return response.json();
//         },
//         enabled: !!user?.email, // Ensure the query runs only when user email is available
//     });

//     console.log(orders);

//     return (
//         <div>
//             <div className='section-container w-full'>
//                 <div className='pt-10'>
//                     <div className='space-y-7 px-4 text-center py-20'>
//                         <h1 className='lg:text-5xl text-3xl font-bold md:leading-snug leading-snug font-lora'>
//                             Track Your <span className='text-green'>Orders</span>
//                         </h1>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <div className="overflow-x-auto text-black lg:mx-24 mx-10">
//                     <table className="table">
//                         {/* head */}
//                         <thead className='bg-green text-white rounded-sm'>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Order Date</th>
//                                 <th>Transaction ID</th>
//                                 <th>Price</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* row 1 */}
//                             {
//                                 orders.length > 0 ? (
//                                     orders.map((item, index) => (
//                                         <tr key={index}>
//                                             <td>{index + 1}</td>
//                                             <td>
//                                                 {item.createAt}
//                                             </td >
//                                             <td className='font-medium'>
//                                                 {item.transactionId}
//                                             </td>
//                                             <td>
//                                                 ${item.price}
//                                             </td>
//                                             <td>${item.status }</td>
//                                             <th>
//                                                 <Link to='/contact' className="btn btn-ghost btn-xs">Contact</Link>
//                                             </th>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="text-center">No orders found</td>
//                                     </tr>
//                                 )
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Order;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Order = () => {
    const { user } = useAuth(); // Call the hook properly
    const token = localStorage.getItem('access-token');
    
    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return []; // Return an empty array if user or user.email is undefined
            }
            const response = await fetch(`https://food-website-backend-6xik.onrender.com/payments?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return response.json();
        },
        enabled: !!user?.email, // Only run query if user.email is available
    });

    // console.log(orders);
    const formatDate = (createdAt) => {
        const createdDate = new Date(createdAt);
        return createdDate.toLocaleDateString();
    }

    return (
        <div>
            <div className='section-container w-full'>
                <div className='pt-10'>
                    <div className='space-y-7 px-4 text-center py-20'>
                        <h1 className='lg:text-5xl text-3xl font-bold md:leading-snug leading-snug font-lora'>
                            Track Your <span className='text-green'>Orders</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto text-black lg:mx-24 mx-10">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-green text-white rounded-sm'>
                            <tr>
                                <th>#</th>
                                <th>Order Date</th>
                                <th>Transaction ID</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                orders.length > 0 ? (
                                    orders.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(item.createdAt)}</td>
                                            <td className='font-medium'>{item.transactionId}</td>
                                            <td>${item.price}</td>
                                            <td>{item.status}</td>
                                            <th>
                                                <Link to='/contact' className="btn text-red btn-ghost btn-xs">Contact</Link>
                                            </th>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No orders found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Order;
