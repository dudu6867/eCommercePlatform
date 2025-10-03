package com.sysco.order_service.service;

import com.sysco.order_service.DTO.OrderDTO;
import com.sysco.order_service.exception.OrderNotFoundException;
import com.sysco.order_service.model.Order;
import com.sysco.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final OrderMapper mapper;

    public OrderDTO placeOrder(OrderDTO dto) {
        Order order = mapper.toEntity(dto);
        Order saved = repository.save(order);
        return mapper.toDto(saved);
    }

    public OrderDTO getOrderById(Long id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID"));
    }

    public List<OrderDTO> getOrdersByUser(Long userId) {
        return repository.findByUserId(userId)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}

