import axios from "axios";

const getProducts = async () => {
    try {
        const response = await axios.get(
            // `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
            `http://localhost:3500/products`
        );
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for proper handling
    }
};

export const ProductService = { getProducts };