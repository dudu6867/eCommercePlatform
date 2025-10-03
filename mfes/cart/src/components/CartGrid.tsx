import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { CartItem } from "../types/Cart";
import fallbackImage from '../assets/default.webp';

interface CartGridProps {
  handlePlaceOrder: (totalAmount: number) => void;
  placingOrder: boolean;
  actionMessage: string | null;
  cart: CartItem[];
  handleDelete: (itemId: number) => void;
  handleIncrease: (itemId: number) => void;
  handleDecrease: (itemId: number) => void;
}

const CartGrid: React.FC<CartGridProps> = ({
  handlePlaceOrder,
  placingOrder,
  actionMessage,
  cart,
  handleDelete,
  handleIncrease,
  handleDecrease
}) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Cart</h2>
        <Button
          variant="danger"
          disabled={true}
        > Total: ${totalAmount.toFixed(2)}</Button>
        <Button
          variant="success"
          onClick={() => handlePlaceOrder(totalAmount)}
          disabled={placingOrder || cart.length === 0}
        >
          {placingOrder ? <Spinner as="span" animation="border" size="sm" /> : "Place Order"}
        </Button>
      </div>

      {actionMessage && <Alert variant="info">{actionMessage}</Alert>}

      {cart.length === 0 ? (
        <Alert variant="secondary">Your cart is empty.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {cart.map((item) => (
            <Col key={item.id}>
              <Card>
                <Card.Img
                            variant="top"
                            src={item.imageUrl || fallbackImage}
                            alt={item.name}
                            style={{ objectFit: "cover", height: "200px" }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = fallbackImage;
                            }}
                        />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text><strong>${(item.price * item.quantity).toFixed(2)}</strong></Card.Text>
                  <Card.Text>
                    Qty:
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="mx-1"
                      onClick={() => handleDecrease(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="mx-1"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </Button>
                  </Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default CartGrid;