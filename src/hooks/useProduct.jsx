import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useProduct = () => {
    const axiosPublic = useAxiosPublic();

    const {data: product = [], isPending: loading, refetch} = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axiosPublic.get('/product')
            console.log(res.data); 
            return res.data;
          },
    })
  return [product, loading, refetch] 
}

export default useProduct
