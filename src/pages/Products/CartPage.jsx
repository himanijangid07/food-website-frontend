import React, { useContext, useState } from 'react'
import useCart from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2"
import { AuthContext } from '../../contexts/AuthProvider';
import {Link} from "react-router-dom"

const CartPage = () => {
    const [cart, refetch] = useCart();
    const {user} = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    const calculatePrice = (item) => {
      return item.discountedPrice * item.quantity;
    } 

    const handleDecrease = (item) => {
      console.log(item._id);
      if(item.quantity > 1) {
        fetch(`https://food-website-backend-6xik.onrender.com/carts/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({quantity: item.quantity - 1})
        }).then(res => res.json()).then(data => {
          const updatedCart = cartItems.map((cartItem) => {
            if(cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1
              }
            }
            return cartItem;
          })
          refetch();
          setCartItems(updatedCart);
        })
        refetch();
      }
      else {
        alert("Item can't be zero.")
      }
    }

    const handleIncrease = (item) => {
      console.log(item._id);
      fetch(`https://food-website-backend-6xik.onrender.com/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({quantity: item.quantity + 1})
      }).then(res => res.json()).then(data => {
        const updatedCart = cartItems.map((cartItem) => {
          if(cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1
            }
          }
          return cartItem;
        })
        refetch();
        setCartItems(updatedCart);
      })
      refetch();
    }

    const cartSubTotal = cart.reduce((total, item) => {
      return total + calculatePrice(item);
    }, 0);

    const orderTotal = cartSubTotal;

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`https://food-website-backend-6xik.onrender.com/carts/${item._id}`, {
                method: "DELETE"
              }).then(res => res.json()).then(data => {
                if(data.deletedCount > 0) {
                  refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Item has been deleted.",
                        icon: "success"
                      });
                }
                refetch();
              })
            }
          });
    }
  return (
    <div>
      <div className='section-container w-full'>
      <div className='pt-10'>
        <div className=' space-y-7 px-4 text-center py-20'>
            <h1 className='lg:text-5xl text-3xl font-bold md:leading-snug leading-snug font-lora'>Items Added to the <span className='text-green'>Cart</span></h1>
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
        <th>Product</th>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((item, index) => (
            <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="" />
              </div>
            </div>
          </div>
        </td>
        <td className='font-medium'>
         {item.name}
        </td>
        <td>
          <div className='flex items-center'>
          <button className='btn btn-xs mx-2 bg-white border-0 text-gray text-xl' onClick={() => handleDecrease(item)}>-</button>
          <input type="number"  value={item.quantity} onChange={() => console.log(item.quantity)} className='bg-white text-gray w-2 mx-2 text-center overflow-hidden appearance-none'/>
          <button className='btn btn-xs mx-2 bg-white border-0 text-gray text-xl' onClick={() => handleIncrease(item)}>+</button>
          </div>
        </td>
        <td>${calculatePrice(item).toFixed(2)}</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(item)}>
            <FontAwesomeIcon icon={faTrash} className='text-red'/>
          </button>
        </th>
      </tr>
        ))
      }
    </tbody>
  </table>
    </div>
    </div>

    <div className='my-12 flex flex-col md:flex-row justify-center items-start'>
      <div className='md:w-1/2 space-y-3'>
        <h3 className='text-black font-medium font-lora text-f lg:text-2xl lg:px-24 px-10'>Customer Details</h3>
        <p className='text-black font-medium font-sans lg:text-xl lg:px-24 px-10'>Name: {user.displayName}</p>
        <p className='text-black font-medium font-sans lg:text-xl lg:px-24 px-10'>Email: {user.email}</p>
        <p className='text-black font-medium font-sans lg:text-xl lg:px-24 px-10'>User ID: {user.uid}</p>
      </div>
      <div className='md:w-1/2 space-y-3'>
      <h3 className='text-black font-medium font-lora text-f lg:text-2xl lg:px-24 px-10 mt-5 lg:mt-0'>Shopping Details</h3>
        <p className='text-black font-medium font-sans lg:text-xl lg:px-24 px-10'>Total Items: {cart.length}</p>
        <p className='text-black font-medium font-sans lg:text-xl lg:px-24 px-10'>Total Price: ${orderTotal.toFixed(2)}</p>
        <Link to='/payment-checkout'>
        <button className='text-white bg-green font-medium font-sans text-xl lg:mx-24 px-7 py-3 rounded-full mx-10 mt-6'> Proceed to Checkout</button>
        </Link>
      </div>
    </div>
    </div>
  ) 
}

export default CartPage
