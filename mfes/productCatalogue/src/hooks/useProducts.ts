import { useEffect, useState } from "react";
import productService from "../services/ProductService";
import { Product } from "../types/Products";
import { User } from "../types/Users";

const useProducts = (
  user: User | null,
  page,
  size,
  setTotalPages
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {

        if (user.role === "supplier") {
          const data = await productService.getProductBySupplierPaginated(user.id, page, size);
          setProducts(data.content || []);
          setTotalPages(data.totalPages);
          console.log("Fetched supplier products:", data);
        } else {
          const result = await productService.getAllProductsStewardsPaginated(page, size);
          console.log("Fetched paginated products:", result);
          setProducts(result.content || []);
          setTotalPages(result.totalPages); 
        }

      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, page, size]);

  return { products, setProducts, loading, error };
};

export default useProducts;