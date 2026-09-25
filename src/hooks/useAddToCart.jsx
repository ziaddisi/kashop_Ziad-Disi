import { useQueryClient, useMutation } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useAddToCart() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values) => {
            console.log(values);

            return await authAxiosInstance.post('/Carts', {
                ProductId: values.ProductId,
                Count: values.count
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }

    });
}