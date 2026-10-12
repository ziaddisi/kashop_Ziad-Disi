import React from 'react';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export default function ProfileOrders() {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
      }}
    >
      {/* Page heading */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 3,
        }}
      >
        <ShoppingBagOutlinedIcon
          sx={{
            fontSize: { xs: 30, sm: 36 },
            color: 'primary.main',
          }}
        />

        <Box>
          <Typography
            component="h2"
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            My Orders
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            View your previous orders and payment details.
          </Typography>
        </Box>
      </Box>

      {/* Orders table */}
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          width: '100%',
          borderRadius: 3,
          overflowX: 'auto',
          boxShadow: 'none',
        }}
      >
        <Table
          sx={{
            minWidth: 600,
          }}
          aria-label="My orders"
        >
          <TableHead
            sx={{
              bgcolor: 'action.hover',
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                Order ID
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                Date
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                Payment
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                Total
              </TableCell>

              <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{
                  py: { xs: 5, sm: 7 },
                  borderBottom: 0,
                }}
              >
                <ShoppingBagOutlinedIcon
                  sx={{
                    fontSize: 48,
                    color: 'text.disabled',
                    mb: 1,
                  }}
                />

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  No orders yet
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Your orders will appear here after you place an order.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}