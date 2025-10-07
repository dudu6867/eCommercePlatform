import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Product } from "../types/Products";

interface Props {
    products: Product[];
    userRole: "supplier" | "steward";
    onUpdateClick: (product: Product) => void;
    onDeleteClick: (product: Product) => void;
    onToggleApproval: (product: Product) => void;
}

const ProductTable: React.FC<Props> = ({
    products,
    userRole,
    onUpdateClick,
    onDeleteClick,
    onToggleApproval,
}) => {
    return (
        <div style={{ minHeight: "400px"}}>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category ID</th>
                        <th>Price ($)</th>
                        <th>Quantity</th>
                        {userRole === "steward" && <th>Supplier ID</th>}
                        {userRole === "supplier" && <th>Approved State</th>}
                        {userRole === "supplier" && <th>Update</th>}
                        {userRole === "supplier" && <th>Remove</th>}
                        {userRole === "steward" && <th>Approved</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            {userRole === "steward" && <td>{product.supplierId}</td>}
                            {userRole === "supplier" && (
                                <td>
                                    {product.isApproved ?
                                        <Button
                                            size="sm"
                                            variant="success"
                                            disabled={true}
                                        >
                                            Approved
                                        </Button>
                                        : <Button
                                            size="sm"
                                            variant="warning"
                                            disabled={true}
                                        >
                                            Pending
                                        </Button>}
                                </td>
                            )}
                            {userRole === "supplier" && (
                                <td>
                                    <Button
                                        size="sm"
                                        variant="warning"
                                        onClick={() => onUpdateClick(product)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            )}
                            {userRole === "supplier" && (
                                <td>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => onDeleteClick(product)}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            )}
                            {userRole === "steward" && (
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={product.isApproved || false}
                                        onChange={() => onToggleApproval(product)}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductTable;