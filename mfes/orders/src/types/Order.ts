export interface Order {
  id: number;
  userId: number;
  productIds: number[];
  orderAddress: string;
  totalAmount: number;
}
