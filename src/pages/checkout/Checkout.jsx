import React from 'react'
import useCart from '../../hooks/useCart'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography, Select } from '@mui/material';
import { useState } from 'react';
import useCheckout from '../../hooks/useCheckout';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';


export default function Checkout() {

   
  const { data, isLoading, isError, error } = useCart();
  const { mutate: checkout } = useCheckout();
  const { mutate: updateCart, isPending } = useUpdateCartItem();
  const [ PaymentMethod, setPaymentMethod ] = useState('');
  if (isLoading) return <CircularProgress />
  if (isError) return <Box color={'red'}>{error}</Box>
  const handleUpdate = (productId, count) => {
  updateCart({ productId, count });
};
  return (
    <Box sx={{
    maxWidth: '1200px',
    mx: 'auto',
    px: '40px',
    py: '50px',
  }}>
    <TableContainer>
      <Table>
        <TableHead  sx={{
    backgroundColor: '#f5f5f5',
  }}>
          <TableCell>Product Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Actions</TableCell>
        </TableHead>
        <TableBody>
          {data.items.map((item) => (
            <TableRow key={item.id} >
              <TableCell>{item.productName}</TableCell>
              <TableCell> {item.price}$</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton size='small'>
                    <RemoveIcon onClick={() => handleUpdate(item.productId, item.count - 1)} />
                  </IconButton>
                  <Typography>{item.count}</Typography>
                  <IconButton>
                    <AddIcon onClick={() => handleUpdate(item.productId, item.count + 1)} />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell> {item.totalPrice}$</TableCell>
              <TableCell><Button color="error" disabled={isPending}
                onClick={() => RemoveItem(item.productId)}>Remove</Button>
    
              </TableCell>
              <TableCell>
                                       
              </TableCell>
            </TableRow>
          ))}
                            
        </TableBody>
      </Table>
    </TableContainer>

      <Box s sx={{
    maxWidth: '500px',
    mx: 'auto',
    p: '30px',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={PaymentMethod}
            label="Visa"
            onChange={(e)=> setPaymentMethod(e.target.value)}
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Visa">Visa</MenuItem>
           
          </Select>
        </FormControl>
        <Button variant='contained' color='success' onClick={() => checkout({ PaymentMethod })}sx={{
    mt: '20px',
    width: '100%',
    py: '12px',
    textTransform: 'none',
    borderRadius: '8px',
  }}>Pay Now</Button>
      </Box>
      </Box>
    );
  }



