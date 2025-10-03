import { Product } from "../types/Product";
import { Category } from "../types/Category";

const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch("http://localhost:3000/bff/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const result = await response.json();
    console.log("Fetched products:", result);
    return result?.content || [];
}

export const getPaginatedProducts = async (
    page: number,
    size: number
): Promise<{ content: Product[]; totalPages: number; totalElements: number }> => {
    const response = await fetch(
        `http://localhost:3000/bff/products?page=${page}&size=${size}`
    );

    if (!response.ok) throw new Error("Failed to fetch paginated products");

    const result = await response.json();
    console.log("Paginated products:", result);
    return {
        content: result.content || [],
        totalPages: result.totalPages,
        totalElements: result.totalElements,
    };
};

const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch("http://localhost:3000/bff/products/categories");
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
}

const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
    const response = await fetch(`http://localhost:3000/bff/products/category/${categoryId}`);
    if (!response.ok) throw new Error("Failed to fetch products by category");
    const result = await response.json();
    return result?.content || [];
}

export const fetchProductsByCategoryPaginated = async (
    categoryId: string,
    page: number,
    size: number
): Promise<{ content: Product[]; totalPages: number; totalElements: number }> => {
    const response = await fetch(
        `http://localhost:3000/bff/products/category/${categoryId}?page=${page}&size=${size}`
    );

    if (!response.ok) throw new Error("Failed to fetch paginated products");

    const result = await response.json();
    console.log("Paginated products:", result);
    return {
        content: result.content || [],
        totalPages: result.totalPages,
        totalElements: result.totalElements,
    };
};

const searchProductsByName = async (name: string): Promise<Product[]> => {
    if (!name.trim()) throw new Error("Please enter a product name");

    const response = await fetch(
        `http://localhost:3000/bff/products/names/${encodeURIComponent(name)}`
    );

    if (!response.ok) throw new Error("Search failed");

    const result = await response.json();
    return result || [];
};

export default {
    fetchProducts,
    fetchCategories,
    fetchProductsByCategory,
    searchProductsByName,
    getPaginatedProducts,
    fetchProductsByCategoryPaginated,
};
