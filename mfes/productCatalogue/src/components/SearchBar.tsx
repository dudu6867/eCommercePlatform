import React from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";

interface Props {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    searchLoading: boolean;
}

const SearchBar: React.FC<Props> = ({
    search,
    setSearch,
    searchLoading
}) => {
    return (
        <>
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
        </>
    );
};

export default SearchBar;