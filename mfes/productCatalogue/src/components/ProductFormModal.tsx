
import React from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { Product } from "../types/Products";

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
  submitting: boolean;
  newProduct: Partial<Product>;
  setNewProduct: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  categories: { id: number; name: string; categoryId: string }[];
}

const ProductFormModal: React.FC<Props> = ({
  show,
  onHide,
  onSubmit,
  submitting,
  newProduct,
  setNewProduct,
  categories,
}) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setNewProduct({ ...newProduct, imageUrl: data.imageUrl });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
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
                setNewProduct({
                  ...newProduct,
                  price: Number(e.target.value),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.quantity || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  quantity: Number(e.target.value),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {newProduct.imageUrl && (
              <div className="mt-2">
                <img
                  src={newProduct.imageUrl}
                  alt="Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={submitting}>
          {submitting ? <Spinner animation="border" size="sm" /> : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;
