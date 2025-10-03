package com.sysco.product_service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long id;

    @NotNull (message = "item name is required")
    private String name;

    private String description;

    @NotNull (message = "category is required")
    private Long categoryId;

    @NotNull (message = "price is required")
    @Min(value = 0, message = "Price cannot be negative")
    private Double price;

    @NotNull (message = "quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    @NotNull(message = "supplier id is required")
    private Long supplierId;

    private Boolean isApproved;
}
