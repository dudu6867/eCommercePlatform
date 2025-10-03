export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  supplierId?: number;
  isApproved?: boolean;
}

const BASE_URL = "http://localhost:3000/bff/products";

const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.content || [];
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
};

export default productService;
