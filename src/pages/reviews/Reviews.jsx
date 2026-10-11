import { useState } from "react";
import useAddReview from "../../hooks/useAddReview";
import { Box, Rating, TextField, Typography } from "@mui/material";


export default function Reviews() {
    
    const [productId, setProductId] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { mutate, isPending, isSuccess, isError } = useAddReview();

    return (
        <Box>
            <Typography variant="h4">
                Product Reviews
                <TextField
                    label="Product ID"
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                />
            </Typography>
            <Typography sx={{ mt: 2 }}>
                Rate The Product
            </Typography>
            <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}>
                
            </Rating>
        </Box>
    );
}