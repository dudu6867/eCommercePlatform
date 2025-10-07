package com.sysco.product_service.service;

import com.sysco.product_service.dto.CategoryDTO;
import com.sysco.product_service.dto.ProductDTO;
import com.sysco.product_service.exception.DuplicateProductException;
import com.sysco.product_service.exception.IdNotFoundException;
import com.sysco.product_service.mapper.CategoryMapper;
import com.sysco.product_service.mapper.ProductMapper;
import com.sysco.product_service.model.Category;
import com.sysco.product_service.model.Product;
import com.sysco.product_service.repository.CategoryRepository;
import com.sysco.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
@RequiredArgsConstructor
public class ProductServiceImplement implements ProductService{

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    private final ProductMapper productMapper;
    private final CategoryMapper categoryMapper;

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImplement.class);

    public ProductDTO createProduct(ProductDTO dto) {

        logger.info("Creating product with id: {}", dto.getId());

        Product product = productMapper.toEntity(dto);
        product.setIsApproved(false);
        try {
            Product saved = productRepository.save(product);
            return productMapper.toDto(saved);
        } catch (DataIntegrityViolationException e) {
            logger.info("Product with same name {} found", product.getName());
            throw new DuplicateProductException("Product with the same name already exists");
        }
    }

    public ProductDTO getProductById(Long id) {
        logger.info("Fetching product by ID: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    logger.info("Product not found for id: {}", id);
                    return new IdNotFoundException("Product not found");
                });

        logger.info("Query product by id: {} successful", id);
        return productMapper.toDto(product);
    }

    public Page<ProductDTO> getProductsByCategory(Long categoryId, Pageable pageable) {
        Page<Product> page = productRepository.findAllByCategoryIdAndIsApprovedTrue(categoryId, pageable);
        return page.map(productMapper::toDto);
    }

    public Page<ProductDTO> getProductsBySupplier(Long supplierId, Pageable pageable) {
        Page<Product> page = productRepository.findAllBySupplierId(supplierId, pageable);
        return page.map(productMapper::toDto);
    }


    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAllByIsApprovedTrue(pageable)
                .map(productMapper::toDto);
    }

    public Page<ProductDTO> getAllProductsStewards(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(productMapper::toDto);
    }


    public ProductDTO patchProduct(Long id, ProductDTO partialDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    logger.info("Product not found for id: {}", id);
                    return new IdNotFoundException("Product not found");
                });

        productMapper.updateProductFromDto(partialDto, product);

        Product updated = productRepository.save(product);
        logger.info("Product patching successful");
        return productMapper.toDto(updated);
    }


    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IdNotFoundException("Invalid Product Id");
        }

        logger.info("Delete product successful");
        productRepository.deleteById(id);
    }

    public List<ProductDTO> searchProductsByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCaseAndIsApprovedTrue(name);
        return products.stream()
                .map(productMapper::toDto)
                .toList();
    }

    public List<ProductDTO> searchProductsByNameAll(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return products.stream()
                .map(productMapper::toDto)
                .toList();
    }

    public List<ProductDTO> searchBySupplierItem(Long supplierId, String name) {
        List<Product> products = productRepository.findBySupplierIdAndNameContainingIgnoreCase(supplierId, name);
        return products.stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO dto) {
        Category category = categoryMapper.toEntity(dto);
        try {
            Category saved = categoryRepository.save(category);
            return categoryMapper.toDto(saved);
        } catch (DataIntegrityViolationException e) {
            logger.info("Category with same name {} found", category.getName());
            throw new DuplicateProductException("Category with the same name already exists");
        }
    }

    @Override
    public CategoryDTO getCategoryById(Long categoryId) {
        logger.info("Fetching category by ID: {}", categoryId);
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> {
                    logger.info("Category not found for id: {}", categoryId);
                    return new IdNotFoundException("Category not found");
                });

        logger.info("Query category by id: {} successful", categoryId);
        return categoryMapper.toDto(category);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(categoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO patchCategory(Long id, CategoryDTO partialDto) {
        Category category = categoryRepository.findByCategoryId(id)
                .orElseThrow(() -> {
                    logger.info("Category not found for id: {}", id);
                    return new IdNotFoundException("Category not found");
                });

        categoryMapper.updateCategoryFromDto(partialDto, category);

        Category updated = categoryRepository.save(category);
        logger.info("Category patching successful");
        return categoryMapper.toDto(updated);
    }

    @Override
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new IdNotFoundException("Invalid Product Id");
        }

        logger.info("Delete category successful");
        categoryRepository.deleteById(id);
    }


}
