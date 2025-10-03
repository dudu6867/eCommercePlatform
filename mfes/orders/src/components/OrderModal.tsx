import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Order } from "../types/Order";

interface OrderModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrder: Order | null;
    products: Product[];
    productsLoading: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({
    showModal,
    setShowModal,
    selectedOrder,
    products,
    productsLoading
}) => {
    return (
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
                                    {/* {p.imageUrl && (
                                        <Card.Img variant="top" src={p.imageUrl} />
                                    )} */}
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
    );
};

export default OrderModal;