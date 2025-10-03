import React from "react";
import {
    Row,
    Col,
    Card,
    Button,
} from "react-bootstrap";
import { Product } from "../types/Product";
import fallbackImage from '../assets/default.webp';

interface Props {
    products: Product[];
    handleAddToCart: (productId: number) => void;
}

const ProductGrid: React.FC<Props> = ({
    products,
    handleAddToCart
}) => {
    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map((product) => (
                <Col key={product.id}>
                    <Card>

                        <Card.Img
                            variant="top"
                            src={product.imageUrl || fallbackImage}
                            alt={product.name}
                            style={{ objectFit: "cover", height: "200px" }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = fallbackImage;
                            }}
                        />

                        <Card.Body>
                            <Card.Title className="text-center">{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>

                            <div className="mb-2">
                                <span className="badge bg-info text-dark">
                                    {product.categoryId}
                                </span>
                            </div>
                            <Card.Text>
                                <strong>${product.price.toFixed(2)}</strong>
                            </Card.Text>
                            <Card.Text>Quantity: {product.quantity}</Card.Text>
                            <Button
                                variant="primary"
                                onClick={() => handleAddToCart(Number(product.id))}
                            >
                                Add to Cart
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProductGrid;