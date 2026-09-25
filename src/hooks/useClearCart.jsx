import { useMutation, useQueryClient } from '@tanstack/react-query';
import authAxiosInstance from '../api/authAxiosInstance';

export default function useClearCart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: () => {
            return authAxiosInstance.delete('/Carts/clear');
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart']
            });
        }

    });
}