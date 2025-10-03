package com.sysco.product_service.controller;

import com.sysco.product_service.dto.CategoryDTO;
import com.sysco.product_service.dto.ProductDTO;
import com.sysco.product_service.service.ProductServiceImplement;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/products") // TODO
@RequiredArgsConstructor
@Tag(name = "Product Service", description = "Operations for managing products")
public class ProductController extends BaseController {

    private final ProductServiceImplement productService;

    @PostMapping
    @Operation(summary = "Create a new product")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO dto) {
        ProductDTO createdProduct = productService.createProduct(dto);
        return created(createdProduct);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Fetch product by ID")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO dto = productService.getProductById(id);
        return success(dto);
    }

    @GetMapping
    @Operation(summary = "Fetch all approved products")
    public ResponseEntity<Page<ProductDTO>> getAllProducts(@PageableDefault(size = 10) Pageable pageable) {
        Page<ProductDTO> products = productService.getAllProducts(pageable);
        return success(products);
    }

    @GetMapping("/stewards")
    @Operation(summary = "Fetch all products")
    public ResponseEntity<Page<ProductDTO>> getAllProductsStewards(@PageableDefault(size = 10) Pageable pageable) {
        Page<ProductDTO> products = productService.getAllProductsStewards(pageable);
        return success(products);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Partially update a product")
    public ResponseEntity<ProductDTO> patchProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        ProductDTO updatedProduct = productService.patchProduct(id, dto);
        return success(updatedProduct);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a product")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return noContent();
    }

    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Fetch product by category ID")
    public ResponseEntity<Page<ProductDTO>> getProductByCategory(@PathVariable Long categoryId, @PageableDefault(size = 10) Pageable pageable) {
        Page<ProductDTO> dto = productService.getProductsByCategory(categoryId, pageable);
        return success(dto);
    }

    @GetMapping("/supplier/{supplierId}")
    @Operation(summary = "Fetch product by supplier ID")
    public ResponseEntity<Page<ProductDTO>> getProductBySupplier(@PathVariable Long supplierId, @PageableDefault(size = 10) Pageable pageable) {
        Page<ProductDTO> dto = productService.getProductsBySupplier(supplierId, pageable);
        return success(dto);
    }

    @GetMapping("/names/{name}")
    @Operation(summary = "Search products by name (partial match)")
    public ResponseEntity<List<ProductDTO>> searchByName(@PathVariable String name) {
        List<ProductDTO> results = productService.searchProductsByName(name);
        return success(results);
    }

    // Category endpoints
    @PostMapping("/categories")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO dto) {
        CategoryDTO createdCategry = productService.createCategory(dto);
        return created(createdCategry);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        CategoryDTO dto = productService.getCategoryById(id);
        return success(dto);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = productService.getAllCategories();
        return success(categories);
    }

    @PatchMapping("/categories/{id}")
    public ResponseEntity<CategoryDTO> patchCategory(@PathVariable Long id, @RequestBody CategoryDTO dto) {
        CategoryDTO updatedCategory = productService.patchCategory(id, dto);
        return success(updatedCategory);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        productService.deleteCategory(id);
        return noContent();
    }
}
