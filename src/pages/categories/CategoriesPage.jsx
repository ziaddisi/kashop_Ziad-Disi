import React from 'react'
import useCategories from '../../hooks/useCategories'
import { Box, Grid, Typography } from '@mui/material';
import Category from '../../ui/category/Category';
import Loader from '../../ui/Loader/Loader';
import { useTranslation } from 'react-i18next';
export default function CategoriesPage() {

    const { data, isLoading, isError, error } = useCategories(100);
    const [t] = useTranslation();

    if (isLoading) return <Loader />
    if (isError) return <Box color={'red'}>{error.message }</Box>
  return (
      <Box className="categories" py={3}>
          <Typography component={'h2'} variant='h4' mb={2}>Categories {t('Categories')}
          </Typography>
          <Grid container spacing={6}>
              {data.response.data.map(category =>
                  <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                      <Category category={category} />
                      </Grid>
              )}
          </Grid>
    </Box>
  )
}
