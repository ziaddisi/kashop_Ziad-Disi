import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'


export default function Category({ category }) {

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        textAlign: 'center',
        overflow: 'hidden',

        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        },
      }}
    >

      {/* Category Image */}

      {category?.image && (
        <CardMedia
          component="img"
          image={category.image}
          alt={category.name}
          sx={{
            width: '100%',
            height: '200px',
            objectFit: 'contain',
            p: '20px',
            boxSizing: 'border-box',
          }}
        />
      )}


      {/* Category Name */}

      <CardContent>

        <Typography
          component="h2"
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          {category?.name}
        </Typography>

      </CardContent>

    </Card>
  )
}