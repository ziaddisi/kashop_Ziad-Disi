import React from 'react'
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, Link, Typography } from '@mui/material';
import Cart from '../cart/Cart';
import useProducts from '../../hooks/useProducts';
import useAddToCart from '../../hooks/useAddToCart';
import ProductDetails from './ProductDetails';


export default function Products() {
    
const { data, isLoading, isError, error } = useProducts();

if (isLoading) {
  return <CircularProgress />;
}

if (isError) {
  return <Typography>{error.message}</Typography>;
}

const products = data?.response?.data || [];
    return (
        <Box className="products" components="section">
            <Typography component="h1" variant='h2'> Products </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{textAlign:'center'}}>
            {data.response.data.map((product) => {
                return <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                    <Link to={`/Products/${product.id}`} style={{textDecoration:'none' , color:'inherit'}}></Link>
                    <Card>
                        <CardMedia
                            component="img"
                            image={product.image}
                            sx={{ width: 200 }}>
                            
                        </CardMedia>
                        <CardContent>
                            <Typography component="h3" variant="h3">{product.name}</Typography>
                            <Typography component="span" variant="body1">{product.price}$</Typography>
                            <Button onClick={() =>addToCart({ProductId: product.id,count: 1 })
                            }
                            >Add to Cart </Button>
                               
                            <Button onClick={ProductDetails}>Product Details </Button>
                        </CardContent>
                        <Link to={`/products/${product.id}`}>
                         View Details
                        </Link>
                    </Card>
                </Grid>
              
            })}
            </Grid>
        </Box>
        
    )
}

