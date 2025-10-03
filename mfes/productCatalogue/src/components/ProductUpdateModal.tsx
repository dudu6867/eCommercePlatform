
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { Product } from "../types/Products";

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
  submitting: boolean;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  categories: { id: number; name: string; categoryId: string }[];
}

const ProductUpdateModal: React.FC<Props> = ({
  show,
  onHide,
  onSubmit,
  submitting,
  selectedProduct,
  setSelectedProduct,
  categories,
}) => {
  const [preview, setPreview] = useState<string | null>(null);


  useEffect(() => {
    // Reset preview when a new product is selected
    setPreview(null);
  }, [selectedProduct]);


  if (!selectedProduct) return null;

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
      setSelectedProduct({ ...selectedProduct, imageUrl: data.imageUrl });
      setPreview(data.imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={selectedProduct.name || ""}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={selectedProduct.description || ""}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={selectedProduct.categoryId || ""}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
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
              value={selectedProduct.price || ""}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: Number(e.target.value),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={selectedProduct.quantity || ""}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  quantity: Number(e.target.value),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {(preview || selectedProduct.imageUrl) && (
              <div className="mt-2">
                <img
                  src={preview || selectedProduct.imageUrl}
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
          {submitting ? <Spinner animation="border" size="sm" /> : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductUpdateModal;
