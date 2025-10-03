package com.sysco.product_service.controller;

import com.sysco.product_service.dto.CategoryDTO;
import com.sysco.product_service.dto.ProductDTO;
import com.sysco.product_service.response.ApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class BaseController {

    @PostMapping
    public abstract ResponseEntity<ApiResponse<ProductDTO>> createProduct(@RequestBody ProductDTO dto);

    @GetMapping("/{id}")
    public abstract ResponseEntity<ApiResponse<ProductDTO>> getProductById(@PathVariable Long id);

    @GetMapping
    public abstract ResponseEntity<ApiResponse<Page<ProductDTO>>> getAllProducts(Pageable pageable);

    @PatchMapping("/{id}")
    public abstract ResponseEntity<ApiResponse<ProductDTO>> patchProduct(@PathVariable Long id, @RequestBody ProductDTO dto);

    @DeleteMapping("/{id}")
    public abstract ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id);

    @GetMapping("/category/{categoryId}")
    public abstract ResponseEntity<ApiResponse<ProductDTO>> getProductByCategory(@PathVariable Long categoryId);

    @GetMapping("/supplier/{supplierId}")
    public abstract ResponseEntity<ApiResponse<ProductDTO>> getProductBySupplier(@PathVariable Long supplierId);

    @GetMapping("/items/{name}")
    public abstract ResponseEntity<ApiResponse<List<ProductDTO>>> searchByName(@RequestParam String name);

    @PostMapping("/categories")
    public abstract ResponseEntity<ApiResponse<CategoryDTO>> createCategory(@RequestBody CategoryDTO dto);

    @GetMapping("categories/{id}")
    public abstract ResponseEntity<ApiResponse<CategoryDTO>> getCategoryById(@PathVariable Long id);

    @GetMapping("/categories")
    public abstract ResponseEntity<ApiResponse<List<CategoryDTO>>> getAllCategories();

    @PatchMapping("categories/{id}")
    public abstract ResponseEntity<ApiResponse<CategoryDTO>> patchCategory(@PathVariable Long id, @RequestBody CategoryDTO dto);

    @DeleteMapping("categories/{id}")
    public abstract ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id);

}
