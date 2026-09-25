import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance';
import { useQuery } from '@tanstack/react-query';

export default function useCart() {

  const token = localStorage.getItem('accessToken');

  const getItems = async () => {
    const response = await authAxiosInstance.get('/Carts');
    return response.data;
  }

  return useQuery({
    queryKey: ['cart', 'en'],
    queryFn: getItems,
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
    retry: false
  });

}