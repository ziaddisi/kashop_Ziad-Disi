import React from 'react'
import useProduct from '../../hooks/useProduct'
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import useAddToCart from '../../hooks/useAddToCart';
import { Link } from 'react-router-dom';
export default function ProductDetails() {

    
    const { id } = useParams();
    const {Mutation: useAddToCart} = useAddToCart();
    const { data, isError, isLoading, error } = useProduct(id);
    
    if (isLoading) return <CircularProgress/>   
  console.log(data);
  return (
      <Box>
        <Typography>{data.response.name }</Typography>
        <Typography>{data.response.description}</Typography>
        <Button onClick={() => ( useAddToCart({productId:data.response.id,count:1}))}>Add to Cart
      </Button>
      <Link to="/products">
        Products
      </Link>
          </Box>
  )
}
    