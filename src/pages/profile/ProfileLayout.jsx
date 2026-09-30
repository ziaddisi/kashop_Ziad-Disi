import { Box,Button, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom';




export default function ProfileLayout() {
  return (
        <Box sx={{
  maxWidth: '1000px',
  mx: 'auto',
  px: '40px',
  py: '50px',
}}>
          <Typography variant="h3"
  sx={{
    fontWeight: 700,
    mb: '30px',
  }}>My profile</Typography>

        <Box
  sx={{
    display: 'flex',
    gap: '15px',
    mb: '30px',
  }}
>
  <Button
    component={Link}
    to="/profile"
    variant="outlined"
    sx={{ textTransform: 'none' }}
  >
    Info
  </Button>

  <Button
    component={Link}
    to="orders"
    variant="outlined"
    sx={{ textTransform: 'none' }}
  >
    Orders
  </Button>
</Box>
          <Box
  sx={{
    p: '30px',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  }}
>
  <Outlet />
</Box>
        </Box>
  )
}
