
import useCart from '../../hooks/useCart';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import useClearCart from '../../hooks/useClearCart';

import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Alert,
} from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Cart() {
  const { data, isLoading, isError, error } = useCart();
  const navigate = useNavigate();

  const { mutate: removeItem, isPending: isRemoving } =
    useRemoveFromCart();

  const { mutate: updateItem, isPending: isUpdating } =
    useUpdateCartItem();

  const { mutate: clearItem, isPending: isClearing } =
    useClearCart();

  const items = data?.items || [];
  const isBusy = isRemoving || isUpdating || isClearing;

  const handleUpdate = (productId, action) => {
    const item = items.find(
      (cartItem) => cartItem.productId === productId
    );

    if (!item) return;

    if (action === '+') {
      updateItem({
        productId,
        count: item.count + 1,
      });
    } else if (item.count > 1) {
      updateItem({
        productId,
        count: item.count - 1,
      });
    }
  };

  const totalPrice = items.reduce(
    (total, item) => total + Number(item.totalPrice || 0),
    0
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
          {error?.message || 'Error loading your cart.'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: 1200,
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
          fontWeight: 700,
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.7rem' },
          mb: 4,
        }}
      >
        Cart
      </Typography>

      {/* Empty cart */}
      {items.length === 0 ? (
        <Card
          sx={{
            textAlign: 'center',
            py: { xs: 4, md: 6 },
            px: 2,
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
          />

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Your cart is empty
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Browse our products and add something you like.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{ textTransform: 'none' }}
          >
            Browse Products
          </Button>
        </Card>
      ) : (
        <>
          {/* Cart items */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {items.map((item) => (
              <Card
                key={item.id ?? item.productId}
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 2, sm: 3 },
                    '&:last-child': { pb: { xs: 2, sm: 3 } },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'stretch', sm: 'center' },
                      gap: 2,
                    }}
                  >
                    {/* Product information */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: '1rem', sm: '1.15rem' },
                          fontWeight: 600,
                          overflowWrap: 'anywhere',
                          mb: 1,
                        }}
                      >
                        {item.productName}
                      </Typography>

                      <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                        Price: ${item.price}
                      </Typography>

                      <Typography sx={{ fontWeight: 600 }}>
                        Subtotal: ${item.totalPrice}
                      </Typography>
                    </Box>

                    {/* Quantity controls */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'flex-start', sm: 'center' },
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        aria-label="Decrease quantity"
                        disabled={isBusy || item.count <= 1}
                        onClick={() =>
                          handleUpdate(item.productId, '-')
                        }
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        sx={{
                          minWidth: 28,
                          textAlign: 'center',
                          fontWeight: 600,
                        }}
                      >
                        {item.count}
                      </Typography>

                      <IconButton
                        size="small"
                        aria-label="Increase quantity"
                        disabled={isBusy}
                        onClick={() =>
                          handleUpdate(item.productId, '+')
                        }
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Remove item */}
                    <Button
                      color="error"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      disabled={isBusy}
                      onClick={() => removeItem(item.productId)}
                      sx={{
                        alignSelf: { xs: 'flex-start', sm: 'center' },
                        textTransform: 'none',
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Cart summary */}
          <Card
            sx={{
              mt: 4,
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Order Summary
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography color="text.secondary">
                  Total
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, overflowWrap: 'anywhere' }}
                >
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  disabled={isBusy}
                  onClick={() => clearItem()}
                  sx={{ textTransform: 'none' }}
                >
                  Clear Cart
                </Button>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1.5,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/products')}
                    sx={{ textTransform: 'none' }}
                  >
                    Continue Shopping
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => navigate('/checkout')}
                    sx={{ textTransform: 'none' }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}

