package com.sysco.order_service.service;

import com.sysco.order_service.DTO.OrderDTO;
import com.sysco.order_service.model.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderDTO toDto(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .productIds(order.getProductIds())
                .orderAddress(order.getOrderAddress())
                .totalAmount(order.getTotalAmount())
                .build();
    }

    public Order toEntity(OrderDTO dto) {
        return Order.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .productIds(dto.getProductIds())
                .orderAddress(dto.getOrderAddress())
                .totalAmount(dto.getTotalAmount())
                .build();
    }
}
