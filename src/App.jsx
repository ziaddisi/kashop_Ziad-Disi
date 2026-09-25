import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './i18next.jsx'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'



const queryClient = new QueryClient()


export default function App() {

  const { i18n } = useTranslation();

useEffect(() => {
  const dir = i18n.language === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
},
  [i18n.language]
)

  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />

    </QueryClientProvider>
  )
}