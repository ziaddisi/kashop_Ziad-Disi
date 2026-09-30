// import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import CategoriesPage from '../categories/CategoriesPage'
import Products from '../products/Products'
import useProducts from '../../hooks/useProducts'
import Product from '../../components/products/Product';
import { Box, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';


export default function Home() {

    
    const { data, isLoading, error, isError } = useProducts();
    const products = data?.response?.data || []; 
    const [currentImage, setCurrentImage] = useState(0);
    const currentProduct = products[currentImage];
    const featuredProducts = products.slice(0, 3);
   console.log(currentProduct);
    

    return (
        <>
        <Box sx={{ width: '100%', height: {
  xs: '420px',
  sm: '460px',
  md: '500px',
}, position: 'relative', overflow: 'hidden', }}>
            
            <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center',}}>
                <Typography
  variant="h4"
  sx={{
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 700,
  }}
>
                    {currentProduct?.name}
                    
                </Typography>
                
                <Box component="img" src={currentProduct?.image} alt={currentProduct?.name || "Product"} sx={{width: {
  xs: '220px',
  sm: '260px',
  md: '300px',
},
height: {
  xs: '220px',
  sm: '260px',
  md: '300px',
}, objectFit: 'contain',mt: '70px' }} >
                    
     
                </Box>
        <Typography
  sx={{
    position: 'absolute',
    top: '85px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '20px',
    fontWeight: 500,
  }}
>
  ${currentProduct?.price}
</Typography>

<Button
  component={Link}
  to={`/Products/${currentProduct?.id}`}
  variant="contained"
  sx={{
    position: 'absolute',
    top: '125px',
    left: '50%',
    transform: 'translateX(-50%)',
    textTransform: 'none',
  }}
>
  View Product
</Button>
                
            </Box>
            <IconButton onClick={() => setCurrentImage((prev) => prev === 0? products.length-1 : prev-1)}  sx={{
    position: 'absolute',
    left: '20px',
    top: '50%',
    zIndex: 2,
    color: 'black',
    backgroundColor: 'white',
    
  }}>
                <ArrowBackIcon/>
            </IconButton>
            <IconButton onClick={() => setCurrentImage((prev) => prev === products.length - 1? 0: prev + 1)} sx={{
    position: 'absolute',
    right: '20px',
    top: '50%',
    zIndex: 2,
    color: 'black',
    backgroundColor: 'white',
  }}>
                <ArrowForwardIcon/>
            </IconButton>
        </Box>
        <Box
  sx={{
    width: '100%',
    py: '40px',
    px: '40px',
  }}
>
  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      mb: '30px',
      textAlign: 'center',
    }}
  >
    Featured Products
  </Typography>
            </Box>
            <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
                    flexWrap: 'wrap',
    px: {
  xs: '16px',
  sm: '24px',
  md: '40px',
},
  }}
>
  {featuredProducts.map((product) => (
    <Box
      key={product.id}
      sx={{
        width: '280px',
        border: '1px solid #eee',
        borderRadius: '12px',
        p: '20px',
        textAlign: 'center',
      }}
    >
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: '200px',
          height: '200px',
          objectFit: 'contain',
        }}
      />

      <Typography
        variant="h6"
        sx={{
          mt: '15px',
          fontWeight: 600,
        }}
      >
        {product.name}
      </Typography>

      <Typography
        sx={{
          mt: '5px',
          mb: '15px',
        }}
      >
        ${product.price}
      </Typography>

      <Button
        component={Link}
        to={`/Products/${product.id}`}
        variant="outlined"
        sx={{
          textTransform: 'none',
        }}
      >
        View Product
      </Button>
    </Box>
  ))}
</Box>
        </>
        
  )
}
