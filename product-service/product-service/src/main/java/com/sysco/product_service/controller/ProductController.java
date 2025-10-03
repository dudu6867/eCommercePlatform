package com.sysco.product_service.controller;

import com.sysco.product_service.dto.CategoryDTO;
import com.sysco.product_service.dto.ProductDTO;
import com.sysco.product_service.response.ApiResponse;
import com.sysco.product_service.response.ResponseBuilder;
import com.sysco.product_service.service.ProductServiceImplement;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Tag(name = "Product Service", description = "Operations for managing products")
public class ProductController extends BaseController{
    private final ProductServiceImplement productService;

    @Override
    @Operation(summary = "Create a new product")
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(@Valid @RequestBody ProductDTO dto) {
        ProductDTO created = productService.createProduct(dto);
        return ResponseBuilder.created(created, "Product created successfully");
    }

    @Override
    @Operation(summary = "Fetch product by ID")
    public ResponseEntity<ApiResponse<ProductDTO>> getProductById(@PathVariable Long id) {
        ProductDTO dto = productService.getProductById(id);
        return ResponseBuilder.success(dto, "Product fetched successfully");
    }

    @Override
    @Operation(summary = "Fetch all products")
    public ResponseEntity<ApiResponse<Page<ProductDTO>>> getAllProducts(@PageableDefault(size = 10)  Pageable pageable) {
        Page<ProductDTO> products = productService.getAllProducts(pageable);
        return ResponseBuilder.success(products, "Fetched paginated products");
    }


    @Override
    @Operation(summary = "Partially update a product")
    public ResponseEntity<ApiResponse<ProductDTO>> patchProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        ProductDTO updated = productService.patchProduct(id, dto);
        return ResponseBuilder.success(updated, "Product patched successfully");
    }

    @Override
    @Operation(summary = "Delete a product")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseBuilder.success(null, "Product deleted successfully");
    }

    @Override
    @Operation(summary = "Fetch product by category ID")
    public ResponseEntity<ApiResponse<ProductDTO>> getProductByCategory(@PathVariable Long categoryId) {
        ProductDTO dto = productService.getProductByCategory(categoryId);
        return ResponseBuilder.success(dto, "Product fetched by category successfully");
    }

    @Override
    @Operation(summary = "Fetch product by supplier ID")
    public ResponseEntity<ApiResponse<ProductDTO>> getProductBySupplier(@PathVariable Long supplierId) {
        ProductDTO dto = productService.getProductBySupplier(supplierId);
        return ResponseBuilder.success(dto, "Product fetched by supplier successfully");
    }

    @Override
    @Operation(summary = "Search products by name (partial match)")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> searchByName(@RequestParam String name) {
        List<ProductDTO> results = productService.searchProductsByName(name);
        return ResponseBuilder.success(results, "Products fetched by name search successfully");
    }

    @Override
    public ResponseEntity<ApiResponse<CategoryDTO>> createCategory(CategoryDTO dto) {
        CategoryDTO created = productService.createCategory(dto);
        return ResponseBuilder.created(created, "Product created successfully");
    }

    @Override
    public ResponseEntity<ApiResponse<CategoryDTO>> getCategoryById(Long id) {
        CategoryDTO dto = productService.getCategoryById(id);
        return ResponseBuilder.success(dto, "Category fetched successfully");
    }

    @Override
    public ResponseEntity<ApiResponse<List<CategoryDTO>>> getAllCategories() {
        List<CategoryDTO> categories = productService.getAllCategories();
        return ResponseBuilder.success(categories, "Fetched all categories successfully");
    }

    @Override
    public ResponseEntity<ApiResponse<CategoryDTO>> patchCategory(Long id, CategoryDTO dto) {
        CategoryDTO updated = productService.patchCategory(id, dto);
        return ResponseBuilder.success(updated, "Category patched successfully");
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> deleteCategory(Long id) {
        productService.deleteCategory(id);
        return ResponseBuilder.success(null, "Category deleted successfully");
    }

}
