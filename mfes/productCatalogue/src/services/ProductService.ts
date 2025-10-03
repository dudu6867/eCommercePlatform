import { Product } from "../types/Products";

const BASE_URL = "http://localhost:3000/bff/products";

const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.content || [];
  },

  getAllProductsStewardsPaginated: async (
    page: number, 
    size: number
  ): Promise<{ content: Product[]; totalPages: number; totalElements: number }> => {
    const res = await fetch(`http://localhost:3000/bff/products/stewards?page=${page}&size=${size}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return {
      content: data.content || [],
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    };
  },

  getAllProductsStewards: async (): Promise<Product[]> => {
    const res = await fetch("http://localhost:3000/bff/products/stewards");
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.content || [];
  },

  getProductBySupplier: async (supplierId: number): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/supplier/${supplierId}`);
    if (!res.ok) throw new Error("Failed to fetch products for supplier");
    const data = await res.json();
    return data.content || [];
  },

  getProductBySupplierPaginated: async (
    supplierId: number,
    page: number, 
    size: number
  ): Promise<{ content: Product[]; totalPages: number; totalElements: number }> => {
    const res = await fetch(`${BASE_URL}/supplier/${supplierId}?page=${page}&size=${size}`);
    console.log(`Fetching products for supplier ${supplierId} - Page: ${page}, Size: ${size}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    console.log("Fetched data:", data);
    return {
      content: data.content || [],
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    };
  },

  createProduct: async (product: Product): Promise<Product> => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  },

  patchProduct: async (id: number, updates: Partial<Product>): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
  },

  deleteProduct: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
  },
  
};

export default productService;