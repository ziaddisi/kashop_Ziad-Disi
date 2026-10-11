import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export default function useProducts(params) {

  const getProducts = async () => {

const response = await axiosInstance.get('/Products', {
  params
});
    return response.data;
  };

  return useQuery({
    queryKey: ['products', params],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5
  });
}