import React, { useEffect, useState } from "react";
// import {
//     fetchProducts,
//     fetchCategories,
//     fetchProductsByCategory,
// } from "../ProductService";
import productService from "../services/ProductService";

import { Product } from "../types/Product";
import { Category } from "../types/Category";

import { addToCart } from "../services/CartService";
import {
    Container,
    Form,
    Alert,
    Button
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";

const ProductApp: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [cartMessage, setCartMessage] = useState<string | null>(null);


    const [page, setPage] = useState(0);
    const [size] = useState(8); // items per page
    const [totalPages, setTotalPages] = useState(0);


    const searchParams = new URLSearchParams(window.location.search);
    const userId = Number(searchParams.get("userId"));

    useEffect(() => {
        // load products + categories 
        Promise.all([productService.fetchCategories()])
            .then(([categories]) => {
                setCategories(categories);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);


    useEffect(() => {
        const fetchPaginatedProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                let result;

                if (selectedCategory) {
                    result = await productService.fetchProductsByCategoryPaginated(selectedCategory, page, size);
                } else {
                    result = await productService.getPaginatedProducts(page, size);
                }

                setProducts(result.content || []);
                setTotalPages(result.totalPages);
            } catch (err: any) {
                setError(err.message || "Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchPaginatedProducts();
    }, [page, size, selectedCategory]);


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!search.trim()) {
            setError("Please enter a product name");
            return;
        }

        setSearchLoading(true);
        setError(null);


        try {
            const result = await productService.searchProductsByName(search);
            setProducts(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSearchLoading(false);
        }

    };

    // const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const categoryId = e.target.value;
    //     setSelectedCategory(categoryId);
    //     setPage(0); // reset to first page on category change

    //     if (!categoryId) {
    //         // Reset to all products if "All" selected
    //         const allProducts = await productService.fetchProducts();
    //         setProducts(allProducts);
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         const categoryProducts = await productService.fetchProductsByCategoryPaginated(categoryId, page, size);
    //         setProducts(categoryProducts.content || []);
    //     } catch (err: any) {
    //         setError(err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        setPage(0); // Reset to first page when category changes
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
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                    categories={categories}
                />
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    searchLoading={searchLoading}
                />
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}
            {cartMessage && <Alert variant="success">{cartMessage}</Alert>}

            <ProductGrid
                products={products}
                handleAddToCart={handleAddToCart}
            />


            <div className="d-flex justify-content-center mt-4">
                <Button
                    variant="outline-primary"
                    disabled={page === 0}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Previous
                </Button>
                <span className="mx-3">Page {page + 1} of {totalPages}</span>
                <Button
                    variant="outline-primary"
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </div>

        </Container>
    );
};

export default ProductApp;
