import React, { useCallback, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthProvider';
import {useLocation, useNavigate} from "react-router-dom"

const UpdateProfile = () => {
    const {updateUserProfile} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const location = useLocation();
      const navigate = useNavigate();

      const from = location.state?.from?.pathname || "/";

      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        console.log('Updating profile with:', { name, photoURL });
        updateUserProfile(name, photoURL).then(() => {
          console.log('Profile update successful');
            navigate(from, {replace: true})
        }).catch((error) => {

        })
      }
  return (
    <div className='flex items-center justify-center py-24'>
      <div className="card w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h3 className='font-bold text-black'>Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input {...register("name")} type="text" placeholder="Name" className=" bg-white border-1 border-gray input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          <input {...register("photoURL")} type="text" placeholder="photoURL" className="bg-white border-1 border-gray input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-green text-white border-0">Update</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UpdateProfile
