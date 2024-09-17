import axios from "axios";
import { Product } from "../types/Product";

export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const response = await axios.get('https://dummyjson.com/products/search',{
            params: {q: query}
        });
        return response.data.products;
    } catch (error){
        console.log('Failed to fetch products: ', error);
        return []
    }
}