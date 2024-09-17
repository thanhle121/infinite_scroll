import axios from 'axios';
import { Product } from '../types/Product';

export const fetchProducts = async (page: number = 1, limit: number = 20): Promise<Product[]> => {
    try {
        const skip = (page - 1) * limit;
        const response = await axios.get('https://dummyjson.com/products', {
        params: { limit, skip },
        });
        return response.data.products;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
};
