package com.sysco.product_service.service;

import com.sysco.product_service.dto.CategoryDTO;
import com.sysco.product_service.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    ProductDTO createProduct(ProductDTO dto);
    ProductDTO getProductById(Long id);
    ProductDTO getProductByCategory(Long categoryId);
    ProductDTO getProductBySupplier(Long supplierId);
    public Page<ProductDTO> getAllProducts(Pageable pageable);
    ProductDTO patchProduct(Long id, ProductDTO partialDto);
    void deleteProduct(Long id);
    List<ProductDTO> searchProductsByName(String name);

    CategoryDTO createCategory(CategoryDTO dto);
    CategoryDTO getCategoryById(Long categoryId);
    List<CategoryDTO> getAllCategories();
    CategoryDTO patchCategory(Long id, CategoryDTO dto);
    void deleteCategory(Long categoryId);
}
