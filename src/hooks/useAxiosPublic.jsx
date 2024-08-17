import axios from 'axios';
import React from 'react'

const axiosPublic = axios.create({
    baseURL: 'https://food-website-backend-6xik.onrender.com'
  });

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic
