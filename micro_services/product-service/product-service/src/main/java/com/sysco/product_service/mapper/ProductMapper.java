package com.sysco.product_service.mapper;

import com.sysco.product_service.dto.ProductDTO;
import com.sysco.product_service.model.Product;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ProductMapper {

    // Map DTO to Entity
    Product toEntity(ProductDTO dto);

    // Map Entity to DTO
    ProductDTO toDto(Product product);

    // Partial update
    void updateProductFromDto(ProductDTO dto, @MappingTarget Product product);
}