import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      sx={{
        mt: '50px',
        py: '25px',
        textAlign: 'center',
        borderTop: '1px solid #eee',
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
        }}
      >
        © 2026 KA Shop. All rights reserved.
      </Typography>
    </Box>
  )
}