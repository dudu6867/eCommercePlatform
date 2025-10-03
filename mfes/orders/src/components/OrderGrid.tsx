import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { Product } from "../types/Product";
import { Order } from "../types/Order";

interface OrderGridProps {
  orders: Order[];
  openModal: (order: Order) => void;
}

const OrderGrid: React.FC<OrderGridProps> = ({
  orders,
  openModal
}) => {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {orders.map((order) => (
        <Col key={order.id} onClick={() => openModal(order)} style={{ cursor: "pointer" }}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Order #{order.id}</Card.Title>
              <Card.Text>Products: {order.productIds.join(", ")}</Card.Text>
              <Card.Text>Total: {order.totalAmount != null ? `$${order.totalAmount.toFixed(2)}` : "N/A"}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OrderGrid;