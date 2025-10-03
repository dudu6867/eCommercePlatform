import React, { useState } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";

import productService from "../services/ProductService";

import { Product } from "../types/Products";

import ProductTable from "../components/ProductTable";
import ProductFormModal from "../components/ProductFormModal";
import ProductUpdateModal from "../components/ProductUpdateModal";
import PaginationControl from "../components/PaginationControl";

import useUser from "../hooks/useUsers";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import useProductActions from "../hooks/useProductActions";

const ProductCatalogueApp: React.FC = () => {

    // const [updating, setUpdating] = useState(false);
    // const [submitting, setSubmitting] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [newProduct, setNewProduct] = useState<Partial<Product>>({});
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [page, setPage] = useState(0);
    const [size] = useState(8); // items per page
    const [totalPages, setTotalPages] = useState(0);

    const { user, loading: userLoading, error: userError } = useUser();

    const categories = useCategories();

    const {
        products,
        setProducts,
        loading: productsLoading,
        error: productsError,
    } = useProducts(user, page, size, setTotalPages);

    const { saveProduct, toggleApproval } = useProductActions(setProducts);

    const handleCreateProduct = async () => {
        const saved = await saveProduct(
            { ...newProduct, supplierId: user!.id, isApproved: false },
            false
        );
        if (saved) {
            setShowModal(false);
            setNewProduct({});
        }
    };

    const handleUpdateProduct = async () => {
        if (!selectedProduct) return;
        const saved = await saveProduct(selectedProduct, true, selectedProduct.id);
        if (saved) {
            setShowUpdateModal(false);
            setSelectedProduct(null);
        }
    };

    const handleDeleteProduct = async (product: Product) => {
        if (!product.id) return;

        const confirmed = window.confirm(`Are you sure you want to delete "${product.name}"?`);
        if (!confirmed) return;

        try {
            await productService.deleteProduct(product.id);
            setProducts((prev) => prev.filter((p) => p.id !== product.id));
        } catch (err: any) {
            alert(err.message || "Failed to delete product");
        }
    };




    if (userLoading || productsLoading) return <Spinner animation="border" />;
    if (userError || productsError) return <Alert variant="danger">{userError || productsError}</Alert>;
    if (!user) return <Alert variant="danger">User not found</Alert>;


    return (
        <div className="container my-4">
            <div className="d-flex justify-content-end align-items-center mb-3">
                
                {user.role === "supplier" && (
                    <Button onClick={() => setShowModal(true)}>Create Product</Button>
                )}
            </div>

            <ProductTable
                products={products}
                userRole={user.role}
                onUpdateClick={(product) => { setSelectedProduct(product); setShowUpdateModal(true); }}
                onDeleteClick={handleDeleteProduct}
                onToggleApproval={toggleApproval}
            />

            <ProductFormModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSubmit={handleCreateProduct}
                submitting={false}
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                categories={categories}
            />

            <ProductUpdateModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                onSubmit={handleUpdateProduct}
                submitting={false}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                categories={categories}
            />

            <PaginationControl
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    );
};

export default ProductCatalogueApp;