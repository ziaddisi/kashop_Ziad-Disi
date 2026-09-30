import React from 'react'
import { Box, Typography } from '@mui/material'



export default function ProfileInfo() {
  return (
    <>
    <Box
  sx={{
    py: '20px',
  }}
>
  <Typography
    variant="h5"
    sx={{
      fontWeight: 600,
      mb: '10px',
    }}
  >
    Profile Information
  </Typography>

  <Typography color="text.secondary">
    Your account information
  </Typography>
</Box>
      </>
  )
}
