import React from 'react'
import useProduct from '../../hooks/useProduct'
import { useParams, Link } from 'react-router-dom'
import {
  Box,
  Button,
  CircularProgress,
  Typography
} from '@mui/material'
import useAddToCart from '../../hooks/useAddToCart'


export default function ProductDetails() {

  const { id } = useParams()

  const { mutate: addToCart } = useAddToCart()

  const {
    data,
    isError,
    isLoading
  } = useProduct(id)


  if (isLoading) {
    return <CircularProgress />
  }


  if (isError) {
    return (
      <Typography>
        Error loading product
      </Typography>
    )
  }


  const product = data?.response


  return (

    <Box
      sx={{
        width: '100%',
        maxWidth: '1100px',
        mx: 'auto',
        px: '40px',
        py: '60px',
        boxSizing: 'border-box',
      }}
    >

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: '50px',
          alignItems: 'center',
        }}
      >

        {/* PRODUCT IMAGE */}

        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
            textAlign: 'center',
          }}
        >

          <Box
            component="img"
            src={product?.image}
            alt={product?.name}
            sx={{
              width: '100%',
              maxWidth: '400px',
              height: '400px',
              objectFit: 'contain',
            }}
          />

        </Box>



        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
          }}
        >

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: '20px',
            }}
          >
            {product?.name}
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: '20px',
            }}
          >
            ${product?.price}
          </Typography>


          <Typography
            variant="body1"
            sx={{
              mb: '30px',
              lineHeight: 1.8,
            }}
          >
            {product?.description}
          </Typography>


          <Button
            variant="contained"
            onClick={() =>
              addToCart({
                productId: product.id,
                count: 1,
              })
            }
            sx={{
              mr: '15px',
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
              textTransform: 'none',
            }}
          >
            Back to Products
          </Button>

        </Box>

      </Box>

    </Box>
  )
}