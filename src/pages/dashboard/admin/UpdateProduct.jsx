import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom"

const UpdateProduct = () => {
    const item = useLoaderData();
    console.log(item);
    const {register, handleSubmit, reset} = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const image_hosting = "ec00cf83dbe83c91c516c1575ab287ce";
    // console.log("image hosting key", image_hosting)
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`
    console.log(image_hosting_api);
      const onSubmit = async (data) => { 
        try {
          const imageFile = new FormData();
          imageFile.append('image', data.image[0]);
      
          const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
              "content-type": "multipart/form-data"
            }
          });
      
          console.log("Image uploaded successfully:", hostingImage.data);
          if(hostingImage.data.success) {
            const productItem = {
              name: data.name,
              category: data.category,
              discountedPrice: parseFloat(data.discountedPrice),
              actualPrice: parseFloat(data.actualPrice),
              image: hostingImage.data.data.display_url
            }
            console.log(productItem);
            const postProductItem = axiosSecure.patch(`/product/${item._id}`, productItem)
            if(postProductItem) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product has been updated!",
                showConfirmButton: false,
                timer: 1500
              });
            }
            navigate("/dashboard/manage-items")
          }
        } catch (error) {
          console.error("Error uploading image:", error.response ? error.response.data : error.message);
        }
      };
  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
      <h2 className='text-2xl text-black font-lora font-bold my-5'>Update This <span className='text-green'>Product</span></h2>
      <div className='text-black'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div  className="form-control w-full ">
  <label className="label">
    <span className="label-text text-black">Product Name* </span>
  </label>
  <input defaultValue={item.name} type="text" {...register("name", { required: true })} placeholder="Recipe Name" className="bg-white border-1 text-gray  border-gray input input-bordered w-full" />
</div>
<div>
<div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text text-black">Category*</span>
  </label>
  <select {...register("category", { required: true })} defaultValue={item.category} className="select select-bordered border-1 border-gray bg-white ">
    <option disabled value="default">Select a Category</option>
    <option value='Vegetables'>Vegetables</option>
    <option value="Fruits">Fruits</option>
    <option value="Fresh">Fresh</option>selected
  </select>
</div>
</div>
<div className='flex items-center gap-4'>
<div  className="form-control w-full ">
  <label className="label">
    <span className="label-text text-black">Discounted Price* </span>
  </label>
  <input defaultValue={item.discountedPrice} type="number" {...register("discountedPrice", { required: true })} placeholder="Discounted Price" className="bg-white border-1 border-gray input input-bordered w-full" />
</div>
<div  className="form-control w-full ">
  <label className="label">
    <span className="label-text text-black">Actual Price* </span>
  </label>
  <input defaultValue={item.actualPrice } type="number" {...register("actualPrice", { required: true })} placeholder="Actual Price" className="bg-white border-1 border-gray input input-bordered w-full" />
</div>
</div>
<div className="form-control w-full my-6">
  <input type="file" {...register("image", { required: true })} className="file-input bg-white file-input-bordered w-full max-w-xs" />
</div>
<button className='bg-green btn text-white border-0 px-6'>Update Product <FontAwesomeIcon icon={faBoxOpen} /></button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProduct
