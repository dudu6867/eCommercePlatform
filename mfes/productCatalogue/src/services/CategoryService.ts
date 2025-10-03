import { Category } from "../types/Category";

const BASE_URL = "http://localhost:3000/bff/products/categories";

const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
};

export default categoryService;