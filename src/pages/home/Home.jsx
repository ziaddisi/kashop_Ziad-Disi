// import { Button, Typography } from '@mui/material'
import React from 'react'
import CategoriesPage from '../categories/CategoriesPage'
import Products from '../products/Products'

export default function Home() {
  return (
      <div>
          <CategoriesPage />
          <Products />
      </div>
  )
}
