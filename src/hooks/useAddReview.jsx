import { useMutation } from "@tanstack/react-query";
import { addReview } from "../api/reviewsApi";


export default function useAddReview() {
    
    return useMutation({
        mutationFn: ({
            productId, reviewData
        }) =>
            addReview(productId, reviewData),
    });
}