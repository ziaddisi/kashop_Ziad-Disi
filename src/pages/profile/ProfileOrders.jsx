import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

export default function ProfileOrders() {

  const rows = [
    {
      id: 1,
      date: '26/09/2026',
      paymentMethod: 'Visa',
      total: 1200,
      status: 'Paid'
    },
    {
      id: 2,
      date: '25/09/2026',
      paymentMethod: 'Cash',
      total: 850,
      status: 'Pending'
    }
  ];

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((order) => (
              <TableRow key={order.id}>

                <TableCell>{order.id}</TableCell>

                <TableCell>{order.date}</TableCell>

                <TableCell>
                  {order.paymentMethod}
                </TableCell>

                <TableCell>
                  ${order.total}
                </TableCell>

                <TableCell>
                  {order.status}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
}