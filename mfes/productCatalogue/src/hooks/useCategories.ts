import { useEffect, useState } from "react";
import categoryService from "../services/CategoryService";
import { Category } from "../types/Category";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;