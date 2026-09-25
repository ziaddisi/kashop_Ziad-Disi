import axios from 'axios'
import useCart from '../../hooks/useCart';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import useClearCart from '../../hooks/useClearCart';
import { useNavigate } from 'react-router-dom';


export default function Cart() {

 
    const { data, isLoading, isError, error } = useCart();
    const navigate = useNavigate();
    const { mutate: removeItem, isPending } = useRemoveFromCart();
    const { mutate: updateItem, isPending:updateItemPending } = useUpdateCartItem();
    const { mutate: clearItem, isPending:clearItemPending } = useClearCart();
    if (isLoading) return <CircularProgress /> 
    if (isError) return <Typography> {error} </Typography>
    
    const handleUpdate = ( productId,action) => {
        const item = data.items.find(i => i.productId == productId);  
        if (action == '+'){
            updateItem({ productId, count: item.count + 1 })
        } else {
            updateItem({productId,count:item.count-1})
        }
       
    }
    console.log(data);

    return (
        <Box component="section">
            <Typography variant='h1'>Cart</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                         <TableCell>Actions</TableCell>
                    </TableHead>
                    <TableBody>
                        {data.items.map((item)=>(
                        <TableRow key={item.id} >
                                <TableCell>{item.productName}</TableCell>
                                <TableCell> {item.price}$</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems:'center' }}>
                                        <IconButton size='small'>
                                            <RemoveIcon onClick={()=>handleUpdate(item.productId,'-')} />
                                        </IconButton>
                                        <Typography>{item.count}</Typography>
                                        <IconButton>
                                            <AddIcon onClick={()=>handleUpdate(item.productId,'+')} />
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
        </Box>
    )
}