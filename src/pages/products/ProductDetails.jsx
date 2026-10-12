
import React from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useParams, Link } from 'react-router-dom';

import useProduct from '../../hooks/useProduct';
import useAddToCart from '../../hooks/useAddToCart';

export default function ProductDetails() {
  const { id } = useParams();

  const { mutate: addToCart } = useAddToCart();

  const {
    data,
    isError,
    isLoading,
  } = useProduct(id);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 1100, mx: 'auto', p: 3 }}>
        <Alert severity="error">
          Error loading product. Please try again later.
        </Alert>

        <Button
          component={Link}
          to="/products"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2, textTransform: 'none' }}
        >
          Back to Products
        </Button>
      </Box>
    );
  }

  const product = data?.response;

  if (!product) {
    return (
      <Box sx={{ py: 8, px: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Product not found.
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 3, sm: 5, md: 7 },
        boxSizing: 'border-box',
      }}
    >
      {/* Back navigation */}
      <Button
        component={Link}
        to="/products"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: { xs: 3, md: 4 },
          textTransform: 'none',
        }}
      >
        Back to Products
      </Button>

      {/* Product details card */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 3, md: 6 },
          p: { xs: 2, sm: 3, md: 5 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: { xs: 2, md: 4 },
          boxShadow: '0 3px 16px rgba(0,0,0,0.06)',
        }}
      >
        {/* Product image */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            minWidth: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fafafa',
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            boxSizing: 'border-box',
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name || 'Product'}
            sx={{
              display: 'block',
              width: '100%',
              maxWidth: 420,
              height: {
                xs: 240,
                sm: 320,
                md: 400,
              },
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Product information */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            minWidth: 0,
            overflowWrap: 'anywhere',
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontSize: {
                xs: '1.7rem',
                sm: '2rem',
                md: '2.5rem',
              },
              lineHeight: 1.3,
              fontWeight: 700,
              mb: 2,
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 700,
              mb: 3,
            }}
          >
            ${product.price}
          </Typography>

          {product.description && (
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.9,
                mb: 4,
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-line',
              }}
            >
              {product.description}
            </Typography>
          )}

          {/* Product actions */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: 'wrap',
              gap: 1.5,
              alignItems: 'stretch',
            }}
          >
            <Button
              variant="contained"
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={() =>
                addToCart({
                  productId: product.id,
                  count: 1,
                })
              }
              sx={{
                minHeight: 44,
                px: 3,
                textTransform: 'none',
              }}
            >
              Add to Cart
            </Button>

            <Button
              component={Link}
              to="/products"
              variant="outlined"
              sx={{
                minHeight: 44,
                px: 3,
                textTransform: 'none',
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

