import React from 'react';
import useProduct from '../../../hooks/useProduct';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const ManageItems = () => {
    const [product, refetch] = useProduct();
    const axiosSecure = useAxiosSecure();
    console.log(product);
    
    const handleDeleteItem = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/product/${item._id}`);
                    if (res.status === 200) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted.",
                            icon: "success"
                        });
                        // Refetch products after successful deletion
                        // refetch;
                    }
                } catch (error) {
                    console.error("Error deleting the product:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the product. Please try again.",
                        icon: "error"
                    });
                }
            }
          });
    };

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl text-black font-lora font-bold my-5'>Manage All <span className='text-green'>Product Items</span></h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-green text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Discounted Price</th>
                                <th>Actual Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='text-black'>
                            {/* row 1 */}
                            {
                                product.map((item, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image} // use item.image here
                                                            alt={item.name} // use item.name as alt text
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>${item.discountedPrice.toFixed(2)}</td>
                                        <td>${item.actualPrice.toFixed(2)}</td>
                                        <td>
                                            <Link to={`/dashboard/update-product/${item._id}`}> <button className="btn btn-ghost btn-xs">
                                                <FontAwesomeIcon icon={faEdit} className='text-orange'/>
                                            </button> </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs">
                                                <FontAwesomeIcon icon={faTrash} className='text-red'/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageItems;
