import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import useCategories from '../../hooks/useCategories';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useProducts from '../../hooks/useProducts';



export default function Product() {

   const { data, isLoading, isError, error } = useProducts();
    const Product = () => {

        const { t } = useTranslation();
       

        if (isLoading) {
            return <CircularProgress />;
        }

        if (isError) {
            return <Typography>{error.message}</Typography>;
        }
        return (
        
            <Box className="products" py={3}>
                <Typography component={'h2'} variant='h4' mb={2}>{t('Product')}</Typography>
                <Link to='/product'>show more</Link>
                <Grid container spacing={6}>
                    {data?.response?.data?.map(product =>
                        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Product product={product} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        
        )
    }
}