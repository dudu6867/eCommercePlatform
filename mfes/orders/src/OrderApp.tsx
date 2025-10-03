import React, { useEffect, useState } from "react";
import { fetchOrders, Order } from "./OrderService";
import { fetchProductById, Product } from "./OrderService";
import { Modal, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    fetchOrders(userId) 
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
        order.productIds.map((id) => fetchProductById(id))
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
      <div className="row">
        {orders.map((order) => (
          <div
            className="col-md-4"
            key={order.id}
            onClick={() => openModal(order)}
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <h5 className="card-title">Order #{order.id}</h5>
                <p className="card-text">
                  Products: {order.productIds.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* React-Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order #{selectedOrder?.id} - Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsLoading ? (
            <p>Loading product details...</p>
          ) : (
            <div className="row">
              {products.map((p) => (
                <div className="col-md-4 mb-3" key={p.id}>
                  <Card>
                    {p.imageUrl && (
                      <Card.Img variant="top" src={p.imageUrl} />
                    )}
                    <Card.Body>
                      <Card.Title>{p.name}</Card.Title>
                      <Card.Text>{p.description}</Card.Text>
                      <div><strong>${p.price.toFixed(2)}</strong></div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderApp;
