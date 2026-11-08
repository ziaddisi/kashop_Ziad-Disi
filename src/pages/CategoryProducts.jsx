import React from 'react';

import {
  Box,
  Grid,
  Typography,
  Alert,
} from '@mui/material';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useProducts from '../hooks/useProducts';
import Loader from '../ui/loader/Loader';
import Product from '../ui/product/Product';

export default function CategoryProducts() {
  const { t } = useTranslation();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useProducts();


  const products = data?.response?.data || [];


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
        <Loader />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 5 },
          py: 4,
          boxSizing: 'border-box',
        }}
      >
        <Alert severity="error">
          {error?.message || 'Failed to load products.'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: 1400,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 3, sm: 4, md: 6 },
        boxSizing: 'border-box',
      }}
    >
     
      <Typography
        component="h1"
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: {
            xs: '1.6rem',
            sm: '2rem',
            md: '2.4rem',
          },
          mb: { xs: 3, sm: 4 },
        }}
      >
        {t('Products')}
      </Typography>

    
      {products.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
          >
            No products available.
          </Typography>
        </Box>
      ) : (

        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
        >
          {products.map((product) => (
            <Grid
              key={product.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  minWidth: 0,
                }}
              >
                <Product product={product} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}