package com.sysco.cart_service.dto;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {
    private Long id;
    private Long userId;
    private Map<Long, Integer> productQuantities; // productId → quantity
    private boolean checkedOut;
}