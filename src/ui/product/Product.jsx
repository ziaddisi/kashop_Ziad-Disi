import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const name =
    product.translations?.find(
      (item) => item.language === 'en'
    )?.name ||
    product.translations?.[0]?.name ||
    product.name ||
    'Product';

  const image =
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    '';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      {image && (
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            height: 200,
            objectFit: 'contain',
            p: 2,
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
        >
          {name}
        </Typography>

        <Typography
          variant="h6"
          color="primary"
        >
          {product.price ?? 0}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              navigate(`/products/${product.id}`)
            }
          >
            View Product
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}