
import React, { useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Divider,
  IconButton,
  Alert,
} from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useNavigate } from 'react-router-dom';

import useCart from '../../hooks/useCart';
import useCheckout from '../../hooks/useCheckout';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';

export default function Checkout() {
  const { data, isLoading, isError, error } = useCart();

  const { mutate: checkout, isPending: isCheckingOut } = useCheckout();

  const { mutate: updateCart, isPending: isUpdating } =
    useUpdateCartItem();

  const [paymentMethod, setPaymentMethod] = useState('');

  const navigate = useNavigate();

  const items = data?.items || [];

  const isBusy = isUpdating || isCheckingOut;

  const totalPrice = items.reduce(
    (total, item) => total + Number(item.totalPrice || 0),
    0
  );

  const handleUpdate = (productId, count) => {
    if (count < 1 || isBusy) return;

    updateCart({
      productId,
      count,
    });
  };

  const handleCheckout = () => {
    if (!items.length || !paymentMethod || isBusy) return;

    checkout({
      PaymentMethod: paymentMethod,
    });
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
      <Box sx={{ maxWidth: 1100, mx: 'auto', p: 3 }}>
        <Alert severity="error">
          {error?.message || 'Failed to load your cart.'}
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
      <Typography
        component="h1"
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.7rem' },
          mb: 1,
        }}
      >
        Checkout
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Review your order and select your payment method.
      </Typography>

      {items.length === 0 ? (
        <Card
          sx={{
            textAlign: 'center',
            py: 5,
            px: 2,
            borderRadius: 3,
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: 60,
              color: 'text.secondary',
              mb: 2,
            }}
          />

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Your cart is empty
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              md: 'minmax(0, 1.6fr) minmax(280px, 1fr)',
            },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          {/* Order items */}
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Your Order
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                      '&:last-child': {
                        pb: { xs: 2, sm: 3 },
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontWeight: 600,
                        overflowWrap: 'anywhere',
                        mb: 1,
                      }}
                    >
                      {item.productName}
                    </Typography>

                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      ${item.price} per item
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          aria-label="Decrease quantity"
                          disabled={isBusy || item.count <= 1}
                          onClick={() =>
                            handleUpdate(item.productId, item.count - 1)
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
                            minWidth: 24,
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
                            handleUpdate(item.productId, item.count + 1)
                          }
                          sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Typography sx={{ fontWeight: 700 }}>
                        ${item.totalPrice}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Order summary and payment */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Order Summary
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  mb: 2,
                }}
              >
                <Typography color="text.secondary">
                  Items
                </Typography>

                <Typography sx={{ fontWeight: 600 }}>
                  {items.reduce(
                    (total, item) => total + Number(item.count || 0),
                    0
                  )}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography color="text.secondary">
                  Total
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel id="payment-method-label">
                  Payment Method
                </InputLabel>

                <Select
                  labelId="payment-method-label"
                  id="payment-method"
                  value={paymentMethod}
                  label="Payment Method"
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Visa">Visa</MenuItem>
                </Select>
              </FormControl>

              {paymentMethod === 'Visa' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Selecting Visa does not process a card payment by itself.
                  Complete payment only through your configured payment
                  provider.
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                color="success"
                disabled={!paymentMethod || isBusy || items.length === 0}
                onClick={handleCheckout}
                sx={{
                  mt: 3,
                  py: 1.4,
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                {isCheckingOut ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Place Order'
                )}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/cart')}
                sx={{
                  mt: 1.5,
                  py: 1.2,
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                Back to Cart
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}

