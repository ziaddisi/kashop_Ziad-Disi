
import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';

export default function Home() {
  const { data, isLoading, isError } = useProducts();

  const products = data?.response?.data || [];
  const [currentImage, setCurrentImage] = useState(0);

  const featuredProducts = products.slice(0, 3);
  const currentProduct = products[currentImage];

  useEffect(() => {
    if (currentImage >= products.length && products.length > 0) {
      setCurrentImage(0);
    }
  }, [currentImage, products.length]);

  const showPreviousProduct = () => {
    setCurrentImage((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const showNextProduct = () => {
    setCurrentImage((prev) =>
      prev >= products.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '50vh',
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
      <Box sx={{ py: 8, px: 2, textAlign: 'center' }}>
        <Typography color="error">
          Failed to load products. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Featured product slider */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: 390, sm: 440, md: 480 },
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f8f8fa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 5, sm: 7, md: 10 },
          py: { xs: 4, sm: 5 },
        }}
      >
        {currentProduct ? (
          <Box
            sx={{
              width: '100%',
              maxWidth: 1000,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 6 },
            }}
          >
            <Box
              component="img"
              src={currentProduct.image}
              alt={currentProduct.name || 'Featured product'}
              sx={{
                width: { xs: 180, sm: 230, md: 320 },
                height: { xs: 180, sm: 230, md: 320 },
                maxWidth: '100%',
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />

            <Box
              sx={{
                width: '100%',
                maxWidth: 420,
                textAlign: { xs: 'center', md: 'left' },
                overflowWrap: 'anywhere',
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontSize: {
                    xs: '1.4rem',
                    sm: '1.8rem',
                    md: '2.2rem',
                  },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {currentProduct.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                ${currentProduct.price}
              </Typography>

              <Button
                component={Link}
                to={`/products/${currentProduct.id}`}
                variant="contained"
                sx={{
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                }}
              >
                View Product
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography sx={{ textAlign: 'center' }}>
            No products available at the moment.
          </Typography>
        )}

        {products.length > 1 && (
          <>
            <IconButton
              aria-label="Previous product"
              onClick={showPreviousProduct}
              sx={{
                position: 'absolute',
                left: { xs: 8, sm: 16, md: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                color: 'black',
                backgroundColor: 'white',
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: '#eeeeee',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <IconButton
              aria-label="Next product"
              onClick={showNextProduct}
              sx={{
                position: 'absolute',
                right: { xs: 8, sm: 16, md: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                color: 'black',
                backgroundColor: 'white',
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: '#eeeeee',
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Featured products heading */}
      <Box
        sx={{
          width: '100%',
          pt: { xs: 4, md: 6 },
          pb: 3,
          px: { xs: 2, sm: 3, md: 5 },
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: { xs: '1.6rem', sm: '2rem' },
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Featured Products
        </Typography>
      </Box>

      {/* Featured product cards */}
      <Box
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3, md: 5 },
          pb: { xs: 4, md: 6 },
          maxWidth: 1400,
          mx: 'auto',
        }}
      >
        {featuredProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              minWidth: 0,
              boxSizing: 'border-box',
              border: '1px solid #e5e5e5',
              borderRadius: 3,
              p: { xs: 2, sm: 3 },
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              '&:hover': {
                boxShadow: 3,
                transform: { sm: 'translateY(-3px)' },
              },
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name || 'Product'}
              loading="lazy"
              sx={{
                display: 'block',
                width: '100%',
                maxWidth: 220,
                height: { xs: 170, sm: 200 },
                objectFit: 'contain',
                mb: 2,
              }}
            />

            <Typography
              variant="h6"
              component="h3"
              sx={{
                width: '100%',
                overflowWrap: 'anywhere',
                fontSize: { xs: '1rem', sm: '1.15rem' },
                fontWeight: 600,
              }}
            >
              {product.name}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                mb: 2,
                fontWeight: 500,
              }}
            >
              ${product.price}
            </Typography>

            <Button
              component={Link}
              to={`/products/${product.id}`}
              variant="outlined"
              sx={{
                mt: 'auto',
                textTransform: 'none',
              }}
            >
              View Product
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

