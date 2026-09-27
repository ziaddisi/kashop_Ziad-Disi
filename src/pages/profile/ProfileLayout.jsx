import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom';




export default function ProfileLayout() {
  return (
        <Box>
          <Typography>My profile</Typography>

        <Link to="/profile">Info</Link>
        <Link to='orders'>Orders</Link>
          <Box>
              <Outlet/>
          </Box>
        </Box>
  )
}
