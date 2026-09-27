import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './i18next.jsx'
import {QueryClient} from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useThemeStore from './hooks/useThemeStore.jsx';
import getTheme from './theme.jsx';

export default function App() {

  const { i18n } = useTranslation();

useEffect(() => {
  const dir = i18n.language === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
},
  [i18n.language])
 
  const mode = useThemeStore((state) => state.mode);
   const theme = getTheme(mode);
  const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>

  <ThemeProvider theme={theme}>

    <CssBaseline />

    <RouterProvider router={router} />

  </ThemeProvider>

</QueryClientProvider>
    </>
      )
}