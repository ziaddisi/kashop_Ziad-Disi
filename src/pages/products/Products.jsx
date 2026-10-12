
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
  Alert,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import Autocomplete, {
  createFilterOptions,
} from '@mui/material/Autocomplete';

import useProducts from '../../hooks/useProducts';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.name || '',
});

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [sortBy, setSortBy] = useState('price');
  const [ascending, setAscending] = useState(false);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useProducts({
    page,
    limit,
    sortBy,
    ascending,
  });

  const { mutate: addToCart } = useAddToCart();
  const { t } = useTranslation();

  const products = data?.response?.data || [];

  const filteredProducts = products.filter((product) =>
    (product.name || '')
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

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
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Alert severity="error">
          Error loading products. Please try again later.
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
            md: '2.8rem',
          },
          mb: { xs: 3, md: 5 },
        }}
      >
        {t('Products')}
      </Typography>

      {/* Search */}
      <Autocomplete
        options={products}
        getOptionLabel={(option) => option.name || ''}
        filterOptions={filterOptions}
        inputValue={search}
        onInputChange={(event, value) => setSearch(value)}
        noOptionsText="No products found"
        sx={{
          width: '100%',
          maxWidth: 500,
          mx: 'auto',
          mb: 3,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Products"
            placeholder="Enter product name"
            fullWidth
          />
        )}
      />

      {/* Sorting and display controls */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 2,
          maxWidth: 850,
          mx: 'auto',
          mb: 4,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            label="Sort By"
            onChange={(event) => {
              setSortBy(event.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="sort-order-label">Order</InputLabel>
          <Select
            labelId="sort-order-label"
            value={ascending ? 'asc' : 'desc'}
            label="Order"
            onChange={(event) => {
              setAscending(event.target.value === 'asc');
              setPage(1);
            }}
          >
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="product-limit-label">Products</InputLabel>
          <Select
            labelId="product-limit-label"
            value={limit}
            label="Products"
            onChange={handleLimitChange}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={9}>9</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ py: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No products found.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {filteredProducts.map((product) => (
            <Grid
              key={product.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: { sm: 'translateY(-3px)' },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name || 'Product'}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    maxWidth: 240,
                    height: { xs: 190, sm: 220 },
                    objectFit: 'contain',
                    mx: 'auto',
                    mt: 2,
                    px: 2,
                    boxSizing: 'border-box',
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h6"
                    sx={{
                      width: '100%',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.15rem' },
                      overflowWrap: 'anywhere',
                      mb: 1,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      mb: 2,
                    }}
                  >
                    ${product.price}
                  </Typography>

                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 1,
                      mt: 'auto',
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() =>
                        addToCart({
                          productId: product.id,
                          count: 1,
                        })
                      }
                      sx={{
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t('Add to Cart')}
                    </Button>

                    <Button
                      fullWidth
                      component={RouterLink}
                      to={`/products/${product.id}`}
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Products;
