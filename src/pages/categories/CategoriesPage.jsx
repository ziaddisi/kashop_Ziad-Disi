import React from 'react'
import useCategories from '../../hooks/useCategories'
import { Box, Grid, Typography } from '@mui/material'
import Category from '../../ui/category/Category'
import Loader from '../../ui/loader/Loader'
import { useTranslation } from 'react-i18next'


export default function CategoriesPage() {

  const { data, isLoading, isError, error } = useCategories(100)

  const { t } = useTranslation()


  if (isLoading) {
    return <Loader />
  }


  if (isError) {
    return (
      <Typography
        sx={{
          color: 'red',
          textAlign: 'center',
          mt: '40px',
        }}
      >
        {error.message}
      </Typography>
    )
  }


  return (

    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        px: '40px',
        py: '50px',
        boxSizing: 'border-box',
      }}
    >

      {/* TITLE */}

      <Typography
        component="h1"
        variant="h3"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          mb: '40px',
        }}
      >
        {t('Categories')}
      </Typography>


      {/* CATEGORIES */}

      <Grid
        container
        spacing={3}
      >

        {data?.response?.data?.map((category) => (

          <Grid
            key={category.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >

            <Category category={category} />

          </Grid>

        ))}

      </Grid>

    </Box>
  )
}