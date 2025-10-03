import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import productService, { Product } from "./productCatalogueService";

interface User {
    id: number;
    name: string;
    role: "supplier" | "steward";
}

const ProductCatalogueApp: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({});
    const [submitting, setSubmitting] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [categories, setCategories] = useState<{ id: number; name: string; categoryId:string; }[]>([]);

    console.log("ProductCatalogueApp rendered");

    // Fetch current user from backend
    useEffect(() => {
        const fetchUser = async () => {
            console.log("Fetching user...");
            setLoading(true);
            setError(null);
            try {
                const userId = Number(new URLSearchParams(window.location.search).get("userId"));
                const res = await fetch(`http://localhost:3000/bff/users/${userId}`);
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                setUser(data);
            } catch (err: any) {
                setError(err.message || "Failed to load user");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3000/bff/products/categories");
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products after user is loaded
    useEffect(() => {
        if (!user) return;
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data =
                    user.role === "supplier"
                        ? await productService.getProductBySupplier(user.id)
                        : await productService.getAllProductsStewards();
                setProducts(data);
                console.log("Fetched products:", data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [user]);

    const handleCreateProduct = async () => {
        if (!newProduct.name || !newProduct.categoryId || !newProduct.price) {
            setError("Name, Category, and Price are required");
            return;
        }

        setSubmitting(true);
        try {
            const created = await productService.createProduct({
                name: newProduct.name!,
                description: newProduct.description || "",
                categoryId: newProduct.categoryId!,
                price: newProduct.price!,
                quantity: newProduct.quantity || 0,
                supplierId: user!.id,
                isApproved: false,
            });
            setProducts((prev) => [...prev, created]);
            setShowModal(false);
            setNewProduct({});
        } catch (err: any) {
            setError(err.message || "Failed to create product");
        } finally {
            setSubmitting(false);
        }
    };

    const toggleApproval = async (product: Product) => {
        if (!product.id) return;
        try {
            const updated = await productService.patchProduct(product.id, {
                isApproved: !product.isApproved,
            });
            setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
            );
        } catch (err: any) {
            setError(err.message || "Failed to update approval");
        }
    };

    // Open update modal with selected product
    const handleOpenUpdateModal = (product: Product) => {
        setSelectedProduct(product);
        setShowUpdateModal(true);
    };

    // Update Product
    const handleUpdateProduct = async () => {
        if (!selectedProduct?.id || !selectedProduct.name || !selectedProduct.categoryId || !selectedProduct.price) {
            setError("Name, Category, and Price are required");
            return;
        }

        setUpdating(true);
        try {
            const updated = await productService.patchProduct(selectedProduct.id, {
                name: selectedProduct.name,
                description: selectedProduct.description,
                quantity: selectedProduct.quantity,
                categoryId: selectedProduct.categoryId,
                price: selectedProduct.price,
            });
            setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
            );
            setShowUpdateModal(false);
            setSelectedProduct(null);
        } catch (err: any) {
            setError(err.message || "Failed to update product");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!user) return <Alert variant="danger">User not found</Alert>;

    return (
        <div className="container my-4">

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Product Catalogue</h2>

                {user.role === "supplier" && (
                    <Button onClick={() => setShowModal(true)}>
                        Create Product
                    </Button>
                )}
            </div>


            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        {user.role === "steward" && <th>Supplier ID</th>}
                        {user.role === "supplier" && <th>Update</th>}
                        {user.role === "steward" && <th>Approved</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.categoryId}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            {user.role === "steward" && (
                                <td>
                                    {product.supplierId}
                                </td>
                            )}
                            {user.role === "supplier" && (
                                <td>
                                    <Button
                                        size="sm"
                                        variant="warning"
                                        onClick={() => handleOpenUpdateModal(product)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            )}
                            {user.role === "steward" && (
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={product.isApproved || false}
                                        onChange={() => toggleApproval(product)}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Create Product Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newProduct.name || ""}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, name: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={newProduct.description || ""}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, description: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={newProduct.categoryId || ""}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        categoryId: Number(e.target.value),
                                    })
                                }
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.categoryId} value={cat.categoryId}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={newProduct.price || ""}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, price: Number(e.target.value) })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={newProduct.quantity || ""}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, quantity: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleCreateProduct}
                        disabled={submitting}
                    >
                        {submitting ? <Spinner animation="border" size="sm" /> : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Update Product Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedProduct?.name || ""}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct!, name: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedProduct?.description || ""}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct!, description: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={selectedProduct?.categoryId || ""}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct!,
                                        categoryId: Number(e.target.value),
                                    })
                                }
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.categoryId} value={cat.categoryId}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={selectedProduct?.price || ""}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct!,
                                        price: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={selectedProduct?.quantity || ""}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct!,
                                        quantity: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowUpdateModal(false)}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUpdateProduct}
                        disabled={submitting}
                    >
                        {submitting ? <Spinner animation="border" size="sm" /> : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductCatalogueApp;
