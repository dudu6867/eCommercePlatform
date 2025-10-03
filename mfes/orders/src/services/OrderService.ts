import { Product } from "../types/Product";
import { Order } from "../types/Order"; 

const fetchOrders = async (userId: number): Promise<Order[]> => {
  const response = await fetch(`http://localhost:3000/bff/orders/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return await response.json();
}

const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`http://localhost:3000/bff/products/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product with id ${id}`);
  return response.json();
}

export default {
  fetchOrders,
  fetchProductById
};
