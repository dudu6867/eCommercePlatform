import React, { useEffect, useState } from "react";
import { fetchCart, deleteCartItem, placeOrder, updateQuantity } from "../services/CartService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { CartItem } from "../types/Cart";
import CartGrid from "../components/CartGrid";

const CartApp: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const userId = Number(searchParams.get("userId"));

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing from URL.");
      setLoading(false);
      return;
    }

    fetchCart(userId)
      .then(setCart)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  console.log("Cart state:", cart);

  const handleDelete = async (itemId: number) => {
    if (!userId) return;
    try {
      const result = await deleteCartItem(userId, itemId);
      setCart((prev) => prev.filter((item) => item.id !== itemId));
      setActionMessage(result.message);
    } catch {
      setActionMessage("Failed to remove item.");
    }
    setTimeout(() => setActionMessage(null), 2000);
  };

  const handlePlaceOrder = async (totalAmount: number) => {
    if (!userId) return;
    setPlacingOrder(true);
    try {
      const result = await placeOrder(userId, cart, totalAmount);
      setCart([]);
      setActionMessage(result.message);
    } catch {
      setActionMessage("Failed to place order.");
    }
    setPlacingOrder(false);
    setTimeout(() => setActionMessage(null), 2000);
  };

  const handleIncrease = (itemId: number) => {
    try {
      const newQuantiy = cart.find(item => item.id === itemId)?.quantity! + 1;
      if (!userId) return;
      const update = updateQuantity(userId, itemId, newQuantiy);
      setCart((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
    catch {
      setActionMessage("Failed to update cart.");
    }
  };

  const handleDecrease = (itemId: number) => {
    try {
      const newQuantiy = cart.find(item => item.id === itemId)?.quantity! - 1;
      if (!userId) return;
      const update = updateQuantity(userId, itemId, newQuantiy);
      setCart((prev) =>
        prev.map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
    catch {
      setActionMessage("Failed to update cart.");
    }

  };

  if (loading)
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <div>Loading cart...</div>
      </Container>
    );

  if (error)
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <CartGrid
      handlePlaceOrder={handlePlaceOrder}
      placingOrder={placingOrder}
      actionMessage={actionMessage}
      cart={cart}
      handleDelete={handleDelete}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
    />
  );
};

export default CartApp;
