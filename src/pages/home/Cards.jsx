import React, { useContext } from 'react';
import {AuthContext} from "../../contexts/AuthProvider";
import Swal from 'sweetalert2';
import {useLocation, useNavigate} from "react-router-dom";

const Cards = ({ item }) => {
  const {name, image, discountedPrice, category, id} = item;
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (item) => {
    console.log(user);
    console.log("button is clicked", item)
    if(user && user?.email) {
      const cartItem = {productItemId: id, name, quantity: 1, image, discountedPrice, category, email: user.email};
      console.log(cartItem)
      fetch('https://food-website-backend-6xik.onrender.com/carts', {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body:JSON.stringify(cartItem)
      }).then(res => res.json()).then(data => {
        console.log("Response from server", data);
        if(data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Item added to the cart",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    } else {
      Swal.fire({
        title: "Please login",
        text: "Without an account can't able to add products.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', {state:{from: location}})
        }
      });
    }
  }
    return (
      <div className="card shadow-xl w-full relative group">
        <figure className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105 md:h-72"
          />
          <div className="absolute top-5 left-5 bg-orange p-1 text-white font-semibold group-hover:opacity-100 opacity-100 transition-opacity duration-200">
            New
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-black font-lora text-xl text-center">{item.name}</h2>
          <p className="text-green text-center font-semibold">
            ${item.discountedPrice} <span className="line-through text-gray">${item.actualPrice}</span>
          </p>
          <div className="card-actions flex justify-center items-center space-x-2">
            <button className="btn bg-green border-0 text-white" onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  };
  export default Cards;