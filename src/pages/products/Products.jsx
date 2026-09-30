import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import useProducts from '../../hooks/useProducts';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';


const Products = () => {

  const { data, isLoading, isError } = useProducts();

  const { mutate: addToCart } = useAddToCart();

  const { t } = useTranslation();


  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography>
        Error loading products
      </Typography>
    );
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

      {/* Page Title */}

      <Typography
        component="h1"
        variant="h3"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          mb: '40px',
        }}
      >
        {t('Products')}
      </Typography>


      {/* Products */}

      <Grid
        container
        spacing={3}
      >

        {data?.response?.data?.map((product) => (

          <Grid
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}
          >

            <Card
              sx={{
                height: '100%',
                borderRadius: '16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                textAlign: 'center',
                p: '20px',
              }}
            >

              {/* Product Image */}

              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'contain',
                  mx: 'auto',
                }}
              />


              <CardContent>

                {/* Product Name */}

                <Typography
                  component="h2"
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: '10px',
                  }}
                >
                  {product.name}
                </Typography>


                {/* Product Price */}

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    mb: '20px',
                  }}
                >
                  ${product.price}
                </Typography>


                {/* Add To Cart */}

                <Button
                  variant="contained"
                  onClick={() =>
                    addToCart({
                      productId: product.id,
                      count: 1
                    })
                  }
                  sx={{
                    textTransform: 'none',
                    mr: '10px',
                  }}
                >
                  {t('Add to Cart')}
                </Button>


                {/* Product Details */}

                <Button
                  component={RouterLink}
                  to={`/Products/${product.id}`}
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                  }}
                >
                  View Details
                </Button>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Box>
  );
};


export default Products;