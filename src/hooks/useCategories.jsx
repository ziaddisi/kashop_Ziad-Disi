import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  const getCategories = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BURL}/Categories`,
      {
        timeout: 10000,
      }
    );

    return response.data;
  };

  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: false,
  });
}