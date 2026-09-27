import { useMutation } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useCheckout() {

    return useMutation({
        mutationFn: async ({ PaymentMethod }) => {


           return await authAxiosInstance.post('/Checkouts', { PaymentMethod })
        }, onSuccess: (response) => {
            if (response?.data?.url) {
                location.href = response.data.url
            }
        }
    }
  )
}
