import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product } from "../types/Product";
import { Order } from "../types/Order";
import productService from "../services/OrderService";
import OrderGrid from "../components/OrderGrid";
import OrderModal from "../components/OrderModal";

const OrderApp: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const userId = Number(searchParams.get("userId"));

  useEffect(() => {
    productService.fetchOrders(userId) 
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const openModal = async (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
    setProductsLoading(true);
    try {
      const fetched = await Promise.all(
        order.productIds.map((id) => productService.fetchProductById(id))
      );
      setProducts(fetched);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setProductsLoading(false);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h2>Placed Orders</h2>
      <OrderGrid
        orders={orders}
        openModal={openModal}
      />

      <OrderModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedOrder={selectedOrder}
        products={products}
        productsLoading={productsLoading}
      />

      
    </div>
  );
};

export default OrderApp;
