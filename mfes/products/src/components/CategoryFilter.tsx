import React from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { Category } from "../types/Category";

interface Props {
    selectedCategory: string;
    handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    categories: Category[];
}

const CategoryFilter: React.FC<Props> = ({
    selectedCategory,
    handleCategoryChange,
    categories
}) => {
    return (
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
    );
};

export default CategoryFilter;