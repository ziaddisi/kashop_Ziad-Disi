
import useCart from '../../hooks/useCart';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import useClearCart from '../../hooks/useClearCart';
import { useNavigate } from 'react-router-dom';


export default function Cart() {

    
    const { data, isLoading, isError, error } = useCart();
    const navigate = useNavigate();
    const { mutate: removeItem, isPending } = useRemoveFromCart();
    const { mutate: updateItem } = useUpdateCartItem();
    const { mutate: clearItem } = useClearCart();
    if (isLoading) return <CircularProgress /> 
if (isError) return <Typography color="error">{error.message}</Typography>    
    const handleUpdate = ( productId,action) => {
        const item = data.items.find(i => i.productId == productId);  
        if (action == '+'){
            updateItem({ productId, count: item.count + 1 })
        } else if (item.count > 1) {
    updateItem({
        productId,
        count: item.count - 1
    })
}
       
    }
    console.log(data);

    return (
        <Box component="section" sx={{
    maxWidth: '1200px',
    mx: 'auto',
    px: '40px',
    py: '50px'
}}>
            <Typography
    variant="h3"
    sx={{
        fontWeight: 700,
        mb: '30px'
    }}
>
    Cart
</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
            <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
                    <TableBody>
                        {data.items.map((item)=>(
                        <TableRow key={item.id} >
                                <TableCell>{item.productName}</TableCell>
                                <TableCell> {item.price}$</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems:'center' }}>
                                <IconButton
                                    size="small"
                                    onClick={() => handleUpdate(item.productId, '-')}>
                                    <RemoveIcon />
                                </IconButton>
                                        <Typography>{item.count}</Typography>
                                        <IconButton
                                    onClick={() => handleUpdate(item.productId, '+')}>
                                    <AddIcon />
                                </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell> {item.totalPrice}$</TableCell>
                                <TableCell><Button color="error" disabled={isPending}
                                    onClick={() => removeItem(item.productId)}>Remove</Button>

                                </TableCell>
                                <TableCell>
                                   
                                </TableCell>
                            </TableRow>
                       ) )}
                        
                    </TableBody>
                </Table>
            </TableContainer>
          

             <Button color="error" disabled={isPending}
                onClick={() => clearItem()}>Clear All</Button>
            
            <Box>
                <Button variant='contained' onClick={()=>navigate('/checkout')}> Proccess to Checkout</Button>
                <Button variant='contained' onClick={()=>navigate('/')}> Continue Shopping </Button>
            </Box>
        </Box>
    )
}