import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
    Grid,
  TextField,
    Typography,
    Select,
MenuItem,
FormControl,
InputLabel,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import useProducts from '../../hooks/useProducts';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.name,
});

const Products = () => {
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(3);
const [sortBy, setSortBy] = useState('price');
    const [ascending, setAscending] = useState(false);
    const { data, isLoading, isError } = useProducts({
  page,
  limit,
  sortBy,
  ascending
});
  const { mutate: addToCart } = useAddToCart();

  const { t } = useTranslation();
const [search, setSearch] = useState('');
    const products = data?.response?.data || [];
    
    const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().startsWith(search.toLowerCase())
    );
    
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
         <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
    mb: 4,
  }}
>
  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel>Sort By</InputLabel>

    <Select
      value={sortBy}
      label="Sort By"
      onChange={(e) => setSortBy(e.target.value)}
    >
      <MenuItem value="price">Price</MenuItem>
    </Select>
  </FormControl>

  <FormControl sx={{ minWidth: 170 }}>
    <InputLabel>Order</InputLabel>

    <Select
      value={ascending}
      label="Order"
      onChange={(e) => setAscending(e.target.value)}
    >
      <MenuItem value={false}>Descending</MenuItem>
      <MenuItem value={true}>Ascending</MenuItem>
    </Select>
  </FormControl>

  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel>Limit</InputLabel>

    <Select
      value={limit}
      label="Limit"
      onChange={(e) => setLimit(Number(e.target.value))}
    >
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={9}>9</MenuItem>
    </Select>
  </FormControl>
</Box>

<Autocomplete
  options={products}
  getOptionLabel={(option) => option.name}
  filterOptions={filterOptions}
  onInputChange={(event, value) => setSearch(value)}
  sx={{ width: '300px', mb: '30px', mx: 'auto' }}
  renderInput={(params) => (
    <TextField {...params} label="Search Products" />
  )}
/>
      {/* Products */}

      <Grid
        container
        spacing={3}
      >

{filteredProducts.map((product) => (
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