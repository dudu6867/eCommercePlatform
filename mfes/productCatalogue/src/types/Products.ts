export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  categoryName?: string;
  supplierId?: number;
  isApproved?: boolean;
  imageUrl?: string;
}