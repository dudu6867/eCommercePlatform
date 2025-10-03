package com.sysco.product_service.mapper;

import com.sysco.product_service.dto.CategoryDTO;
import com.sysco.product_service.model.Category;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CategoryMapper {
    // Map DTO to Entity
    @Mapping(target = "categoryId", source = "categoryId")
    Category toEntity(CategoryDTO dto);

    // Map Entity to DTO
    CategoryDTO toDto(Category category);

    // Partial update
    void updateCategoryFromDto(CategoryDTO dto, @MappingTarget Category category);
}
