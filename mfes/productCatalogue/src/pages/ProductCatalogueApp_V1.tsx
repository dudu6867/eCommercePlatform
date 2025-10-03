// import React, { useEffect, useState } from "react";
// import { Button, Spinner, Alert } from "react-bootstrap";

// import productService from "../services/ProductService";
// import categoryService from "../services/CategoryService";
// import userService from "../services/UserService";

// import { Product } from "../types/Products";
// import { User } from "../types/Users";
// import { Category } from "../types/Category";

// import ProductTable from "../components/ProductTable";
// import ProductFormModal from "../components/ProductFormModal";
// import ProductUpdateModal from "../components/ProductUpdateModal";

// import useUser from "../hooks/useUsers";
// import useProducts from "../hooks/useProducts";
// import useCategories from "../hooks/useCategories";

// const ProductCatalogueApp: React.FC = () => {

//     // const [user, setUser] = useState<User | null>(null);
//     // const [products, setProducts] = useState<Product[]>([]);
//     // const [categories, setCategories] = useState<Category[]>([]);

//     // const [loading, setLoading] = useState(true);
//     const [updating, setUpdating] = useState(false);
//     const [submitting, setSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const [showModal, setShowModal] = useState(false);
//     const [showUpdateModal, setShowUpdateModal] = useState(false);

//     const [newProduct, setNewProduct] = useState<Partial<Product>>({});
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);



//     const { user, loading: userLoading, error: userError } = useUser();
//     const categories = useCategories();
//     const {
//         products,
//         setProducts,
//         loading: productsLoading,
//         error: productsError,
//     } = useProducts(user);


//     // useEffect(() => {
//     //     const fetchUser = async () => {
//     //         setLoading(true);
//     //         setError(null);
//     //         try {
//     //             const userId = Number(new URLSearchParams(window.location.search).get("userId"));
//     //             const data = await userService.getUserById(userId);
//     //             setUser(data);
//     //         } catch (err: any) {
//     //             setError(err.message || "Failed to load user");
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchUser();
//     // }, []);

//     // useEffect(() => {
//     //     const fetchCategories = async () => {
//     //         const data = await categoryService.getAllCategories();
//     //         setCategories(data);
//     //     };

//     //     fetchCategories();
//     // }, []);

//     // useEffect(() => {
//     //     if (!user) return;
//     //     const fetchProducts = async () => {
//     //         setLoading(true);
//     //         setError(null);
//     //         try {
//     //             const data =
//     //                 user.role === "supplier"
//     //                     ? await productService.getProductBySupplier(user.id)
//     //                     : await productService.getAllProductsStewards();
//     //             setProducts(data);
//     //         } catch (err: any) {
//     //             setError(err.message || "Failed to fetch products");
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchProducts();
//     // }, [user]);

//     const handleCreateProduct = async () => {
//         if (!newProduct.name || !newProduct.categoryId || !newProduct.price) {
//             setError("Name, Category, and Price are required");
//             return;
//         }
//         setSubmitting(true);
//         try {
//             const created = await productService.createProduct({
//                 name: newProduct.name!,
//                 description: newProduct.description || "",
//                 categoryId: newProduct.categoryId!,
//                 price: newProduct.price!,
//                 quantity: newProduct.quantity || 0,
//                 supplierId: user!.id,
//                 isApproved: false,
//             });
//             setProducts((prev) => [...prev, created]);
//             setShowModal(false);
//             setNewProduct({});
//         } catch (err: any) {
//             setError(err.message || "Failed to create product");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     const toggleApproval = async (product: Product) => {
//         if (!product.id) return;
//         try {
//             const updated = await productService.patchProduct(product.id, {
//                 isApproved: !product.isApproved,
//             });
//             setProducts((prev) =>
//                 prev.map((p) => (p.id === updated.id ? updated : p))
//             );
//         } catch (err: any) {
//             setError(err.message || "Failed to update approval");
//         }
//     };

//     const handleOpenUpdateModal = (product: Product) => {
//         setSelectedProduct(product);
//         setShowUpdateModal(true);
//     };

//     const handleUpdateProduct = async () => {
//         if (
//             !selectedProduct?.id ||
//             !selectedProduct.name ||
//             !selectedProduct.categoryId ||
//             !selectedProduct.price
//         ) {
//             setError("Name, Category, and Price are required");
//             return;
//         }
//         setUpdating(true);
//         try {
//             const updated = await productService.patchProduct(selectedProduct.id, {
//                 name: selectedProduct.name,
//                 description: selectedProduct.description,
//                 quantity: selectedProduct.quantity,
//                 categoryId: selectedProduct.categoryId,
//                 price: selectedProduct.price,
//             });
//             setProducts((prev) =>
//                 prev.map((p) => (p.id === updated.id ? updated : p))
//             );
//             setShowUpdateModal(false);
//             setSelectedProduct(null);
//         } catch (err: any) {
//             setError(err.message || "Failed to update product");
//         } finally {
//             setUpdating(false);
//         }
//     };

//     // if (loading) return <Spinner animation="border" />;
//     // if (error) return <Alert variant="danger">{error}</Alert>;
//     // if (!user) return <Alert variant="danger">User not found</Alert>;


//     if (userLoading || productsLoading) return <Spinner animation="border" />;
//     if (userError || productsError || error)
//         return <Alert variant="danger">{userError || productsError || error}</Alert>;
//     if (!user) return <Alert variant="danger">User not found</Alert>;


//     return (
//         <div className="container my-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h2 className="mb-0">Product Catalogue</h2>
//                 {user.role === "supplier" && (
//                     <Button onClick={() => setShowModal(true)}>Create Product</Button>
//                 )}
//             </div>

//             <ProductTable
//                 products={products}
//                 userRole={user.role}
//                 onUpdateClick={handleOpenUpdateModal}
//                 onToggleApproval={toggleApproval}
//             />

//             <ProductFormModal
//                 show={showModal}
//                 onHide={() => setShowModal(false)}
//                 onSubmit={handleCreateProduct}
//                 submitting={submitting}
//                 newProduct={newProduct}
//                 setNewProduct={setNewProduct}
//                 categories={categories}
//             />

//             <ProductUpdateModal
//                 show={showUpdateModal}
//                 onHide={() => setShowUpdateModal(false)}
//                 onSubmit={handleUpdateProduct}
//                 submitting={updating}
//                 selectedProduct={selectedProduct}
//                 setSelectedProduct={setSelectedProduct}
//                 categories={categories}
//             />
//         </div>
//     );
// };

// export default ProductCatalogueApp;