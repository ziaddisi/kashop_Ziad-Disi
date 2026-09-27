import { useQuery } from '@tanstack/react-query';
import authAxiosInstance from '../api/authAxiosInstance';

export default function useOrders() {

  const getOrders = async () => {
    const response = await authAxiosInstance.get('admin/orders?status=Approved');

    console.log("ORDERS:", response.data);

    return response.data;
  };

  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  });
}