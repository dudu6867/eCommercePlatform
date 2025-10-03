export interface Order {
  id: number;
  userId: number;
  productIds: number[];
  orderAddress: string;
}

export async function fetchOrders(userId: number): Promise<Order[]> {
  const response = await fetch(`http://localhost:3000/bff/orders/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return await response.json();
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`http://localhost:3000/bff/products/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product with id ${id}`);
  return response.json();
}

