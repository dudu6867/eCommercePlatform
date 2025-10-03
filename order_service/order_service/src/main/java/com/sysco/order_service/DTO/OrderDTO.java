package com.sysco.order_service.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private Long userId;
    private List<Long> productIds;
    private String orderAddress;
    private Double totalAmount;
}
