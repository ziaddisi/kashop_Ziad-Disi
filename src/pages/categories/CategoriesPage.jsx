import React from 'react';

import {
  Box,
  Grid,
  Typography,
  Alert,
} from '@mui/material';

import { useTranslation } from 'react-i18next';

import useCategories from '../../hooks/useCategories';
import Category from '../../ui/category/Category';
import Loader from '../../ui/loader/Loader';

export default function CategoriesPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useCategories(100);

  const { t } = useTranslation();

  const categories = data?.response?.data || [];

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
          {error?.message || 'Failed to load categories.'}
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
      {/* Page title */}
      <Typography
        component="h1"
        variant="h3"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: {
            xs: '1.8rem',
            sm: '2.2rem',
            md: '2.7rem',
          },
          mb: { xs: 3, sm: 4, md: 5 },
        }}
      >
        {t('Categories')}
      </Typography>

      {/* Empty state */}
      {categories.length === 0 ? (
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
            No categories available.
          </Typography>
        </Box>
      ) : (
        /* Categories grid */
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
        >
          {categories.map((category) => (
            <Grid
              key={category.id}
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
                  '& img': {
                    maxWidth: '100%',
                  },
                }}
              >
                <Category category={category} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}