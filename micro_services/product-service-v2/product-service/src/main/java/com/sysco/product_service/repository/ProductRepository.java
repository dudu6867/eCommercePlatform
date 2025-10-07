package com.sysco.product_service.repository;

import com.sysco.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

//@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAllByIsApprovedTrue(Pageable pageable);

    Page<Product> findAllByCategoryId(Long categoryId, Pageable pageable);
    Page<Product> findAllByCategoryIdAndIsApprovedTrue(Long categoryId, Pageable pageable);

    Page<Product> findAllBySupplierId(Long supplierId, Pageable pageable);

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByNameContainingIgnoreCaseAndIsApprovedTrue(String name);

    List<Product> findBySupplierIdAndNameContainingIgnoreCase(Long supplierId, String name);

}