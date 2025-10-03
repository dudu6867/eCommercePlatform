import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  Product,
  Category,
} from "./ProductService";

import { addToCart } from "./CartService";
import "./ProductApp.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductApp: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const userId = Number(searchParams.get("userId"));

  useEffect(() => {
    // load products + categories on startup
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([products, categories]) => {
        setProducts(products);
        setCategories(categories);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a product name");
      return;
    }

    setSearchLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/bff/products/names/${encodeURIComponent(search)}`
      );

      if (!response.ok) throw new Error("Search failed");

      const result = await response.json();
      setProducts(result || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    console.log("Selected category:", categoryId);

    if (!categoryId) {
      // Reset to all products if "All" selected
      const allProducts = await fetchProducts();
      setProducts(allProducts);
      return;
    }

    try {
      setLoading(true);
      const categoryProducts = await fetchProductsByCategory(categoryId);
      setProducts(categoryProducts || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    setCartMessage(null);
    try {
      const result = await addToCart(userId, productId);
      setCartMessage(result.message || "Added to cart!");
    } catch (err: any) {
      setCartMessage("Failed to add to cart");
    }
    setTimeout(() => setCartMessage(null), 2000);
  };

  if (loading) return <div className="product-loading">Loading products...</div>;
  if (error) return <div className="product-error">{error}</div>;

  return (
    <Container className="my-4">
      <Form className="mb-4 d-flex" onSubmit={handleSearch}>
        {/* Category Filter Dropdown */}
        <Form.Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="me-2"
          style={{ maxWidth: "200px" }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </Form.Select>

        {/* Search Box */}
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="me-2"
        />
        <Button type="submit" disabled={searchLoading}>
          {searchLoading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Search"
          )}
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      {cartMessage && <Alert variant="success">{cartMessage}</Alert>}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              {/* {product.imageUrl && (
                <Card.Img variant="top" src={product.imageUrl} />
              )} */}
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>${product.price.toFixed(2)}</strong>
                </Card.Text>
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
    </Container>
  );
};

export default ProductApp;
