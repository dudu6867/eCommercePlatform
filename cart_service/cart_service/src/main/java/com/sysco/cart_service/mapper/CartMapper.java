package com.sysco.cart_service.mapper;

import com.sysco.cart_service.dto.CartDTO;
import com.sysco.cart_service.model.Cart;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CartMapper {

    CartDTO toDto(Cart cart);

    Cart toEntity(CartDTO dto);

    void updateCartFromDto(CartDTO dto, @MappingTarget Cart cart);
}