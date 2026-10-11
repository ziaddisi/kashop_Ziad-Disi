import axiosInstance from "./axiosInstance"

export const addReview = async (productId, reviewData) => {
    const response = await axiosInstance.post(
        `/Products/${productId}/reviews`,
        reviewData
    );
    return response.data;
};