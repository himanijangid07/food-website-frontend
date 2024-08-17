import React, {useContext, useState} from 'react'
import {Link, replace, useLocation, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form"
import {AuthContext} from "../contexts/AuthProvider"
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from "../hooks/useAuth"

const Modal = () => {
    const closeModal = () => {
        document.getElementById('my_modal_3').close();
      };
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const {signUpWithGmail, login} = useAuth();
      const [errorMessage, setErrorMessage] = useState("");
      const axiosPublic = useAxiosPublic();

      const location = useLocation();
      const navigate = useNavigate();

      const from = location.state?.from?.pathname || "/";


      const onSubmit = (data) => {
          const email = data.email;
          const password = data.password;
          console.log(email, password);
          login(email, password).then((result) => {
            console.log(result);
            const user = result.user;
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('/users', userInfo).then((response) => {
              // console.log(response);
              alert("Account Created successfully");
          document.getElementById('my_modal_3').close();
            navigate(from, {replace: true}) 
            })
          }).catch((error) => {
            const errorMessage = error.message;
            console.log("Error during login:", error.message);
            setErrorMessage("Provide a correct email and password");
          })
      }
    
      const handleLogin = () => {
        signUpWithGmail().then((result) => {
          const user = result.user;
          const userInfo = {
            name: result?.user?.displayName,
            email: result?.user?.email
          }
          axiosPublic.post(' /users', userInfo).then((response) => {
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
    <dialog id="my_modal_3" className="modal">
  <div className="modal-box flex flex-col justify-center bg-white text-black">
  <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
    <h3 className='font-bold text-xl mt-5 lg:mt-0'>Please Login!</h3>
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

        {
          errorMessage ? <p className="text-error text-xs italic">{errorMessage}</p> : ""
        }

        <div className="form-control mt-6">
          <input type='submit' value="Login" className="btn bg-green text-white border-0 text-xl"/>
        </div>
        <p className='text-center my-2'>Don't have an account? <Link to="/signup" className='underline text-green ml-1'>Signup Now</Link> </p>
        <button type='button' onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div className='text-center space-x-3 mb-1'>
      <button onClick={() => handleLogin()} className="btn btn-circle bg-white text-black border-1 border-gray hover:bg-green hover:text-white hover:border-0">
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
</dialog>
 )
}

export default Modal;
