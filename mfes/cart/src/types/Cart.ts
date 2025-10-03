export interface CartItem {
  id: number;          // productId
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}