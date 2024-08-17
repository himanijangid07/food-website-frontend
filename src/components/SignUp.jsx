import React, { useContext } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form"
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Signup = () => {
    const closeModal = () => {
        document.getElementById('my_modal_3').close();
      };
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const location = useLocation();
      const navigate = useNavigate();
      const axiosPublic = useAxiosPublic();

      const from = location.state?.from?.pathname || "/";

      const {createUser, signUpWithGmail, updateUserProfile} = useContext(AuthContext)
      const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password).then((result) => {
          const user = result.user;
          updateUserProfile(data.email, data.photoURL).then(() => {
             const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('  /users', userInfo).then((response) => {
              // console.log(response);
              alert("Account Created successfully");
          document.getElementById('my_modal_3').close();
            navigate(from, {replace: true}) 
            })
          })
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        })
      }

      const handleRegister = () => {
        signUpWithGmail().then((result) => {
          const user = result.user;
          const userInfo = {
            name: result?.user?.displayName,
            email: result?.user?.email
          }
          axiosPublic.post('/users', userInfo).then((response) => {
            // console.log(response);
            alert("Account Created successfully");
        document.getElementById('my_modal_3').close();
          navigate('/')
          })
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
      })
      }
  return (
    <div className='max-w-md min-h-screen bg-white shadow w-full mx-auto flex items-center justify-center (prefers-color-scheme: dark)my-20'>
    <div className="modal-action flex flex-col justify-center bg-white text-black">
  <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
    <h3 className='font-bold text-xl mt-5 lg:mt-0'>Create an account!</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" className="input input-bordered bg-white border-1 border-gray" required {...register("email")} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="Password" className="input input-bordered bg-white border-1 border-gray" required {...register("password")} />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input type='submit' value="Signup" className="btn bg-green text-white border-0 text-xl"/>
        </div>
        <p className='text-center my-2'>Have an account? <button onClick={()=>document.getElementById('my_modal_3').showModal()} className='underline text-green ml-1'>Login</button> </p>
        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
      </form>
      <div className='text-center space-x-3 mb-1'>
      <button onClick={() => handleRegister()} className="btn btn-circle bg-white text-black border-1 border-gray hover:bg-green hover:text-white hover:border-0">
            <FontAwesomeIcon icon={faGoogle} size='xl'/>
      </button>
      <button className="btn btn-circle bg-white text-black border-1 border-gray hover:bg-green hover:text-white hover:border-0">
            <FontAwesomeIcon icon={faGithub} size='xl'/>
      </button>
      <button className="btn btn-circle bg-white text-black border-1 border-gray hover:bg-green hover:text-white hover:border-0">
            <FontAwesomeIcon icon={faFacebook} size='xl'/>
      </button>
      </div>
  </div>
  <Modal/> 
  </div>
  )
}

export default Signup
