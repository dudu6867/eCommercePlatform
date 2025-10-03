export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
}

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch("http://localhost:3000/bff/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const result = await response.json();
    console.log("Fetched products:", result);
    return result?.content || [];
}

export interface Category {
  id: string;
  name: string;
  categoryId: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch("http://localhost:3000/bff/products/categories");
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const response = await fetch(`http://localhost:3000/bff/products/category/${categoryId}`);
  if (!response.ok) throw new Error("Failed to fetch products by category");
  const result = await response.json();
  return result?.content || [];
}
