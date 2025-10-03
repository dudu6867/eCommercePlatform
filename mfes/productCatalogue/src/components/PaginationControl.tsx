import React from "react";
import { Table, Button, Form } from "react-bootstrap";

interface Props {
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationControl: React.FC<Props> = ({
    page,
    totalPages,
    setPage
 }) => {
    return (
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
    );
};

export default PaginationControl;