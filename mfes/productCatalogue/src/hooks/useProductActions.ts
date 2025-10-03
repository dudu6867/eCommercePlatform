import { useState } from "react";
import { Product } from "../types/Products";
import productService from "../services/ProductService";

export default function useProductActions(setProducts: React.Dispatch<React.SetStateAction<Product[]>>) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const saveProduct = async (
        productData: Partial<Product>,
        isUpdate: boolean,
        productId?: number
    ) => {
        if (!productData.name || !productData.categoryId || !productData.price) {
            setError("Name, Category, and Price are required");
            return;
        }

        setLoading(true);
        try {
            // Cast productData to Product after required fields are validated
            const productToSave: Product = {
                ...productData,
                name: productData.name!,
                categoryId: productData.categoryId!,
                price: productData.price!,
                quantity: productData.quantity || 0,
                description: productData.description || "",
                supplierId: productData.supplierId,
                isApproved: productData.isApproved,
                id: productData.id, // optional
            };

            const saved = isUpdate
                ? await productService.patchProduct(productId!, productToSave)
                : await productService.createProduct(productToSave);


            setProducts((prev) =>
                isUpdate
                    ? prev.map((p) => (p.id === saved.id ? saved : p))
                    : [...prev, saved]
            );

            return saved;
        } catch (err: any) {
            setError(err.message || `Failed to ${isUpdate ? "update" : "create"} product`);
        } finally {
            setLoading(false);
        }
    };

    const toggleApproval = async (product: Product) => {
        if (!product.id) return;

        setLoading(true);
        try {
            const updated = await productService.patchProduct(product.id, {
                isApproved: !product.isApproved,
            });
            setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
            );
        } catch (err: any) {
            setError(err.message || "Failed to update approval");
        } finally {
            setLoading(false);
        }
    };

    // const deleteProduct = async (productId: number) => {
    //     setLoading(true);
    //     try {
    //         // Assuming there's a deleteProduct method in productService
    //         await productService.deleteProduct(productId);
    //         setProducts((prev) => prev.filter((p) => p.id !== productId));
    //     }
    //     catch (err: any) {
    //         setError(err.message || "Failed to delete product");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return { saveProduct, toggleApproval, loading, error };
}
