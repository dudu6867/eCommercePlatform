package com.sysco.cart_service.service;

import com.sysco.cart_service.dto.CartDTO;
import com.sysco.cart_service.exception.CartNotFoundException;
import com.sysco.cart_service.mapper.CartMapper;
import com.sysco.cart_service.model.Cart;
import com.sysco.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository repository;
    private final CartMapper mapper;

    public CartDTO getCartByUserId(Long userId) {
        Cart cart = repository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for userId"));
        return mapper.toDto(cart);
    }

    public CartDTO addProductToCart(Long userId, Long productId) {
        Cart cart = repository.findByUserId(userId).orElseGet(() -> createCart(userId));
        cart.getProductQuantities().merge(productId, 1, Integer::sum); // adds 1 or increments
        return mapper.toDto(repository.save(cart));
    }

    public CartDTO removeProductFromCart(Long userId, Long productId) {
        Cart cart = repository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for userId"));
        cart.getProductQuantities().remove(productId);
        return mapper.toDto(repository.save(cart));
    }

    public void clearCart(Long userId) {
        Cart cart = repository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for userId"));
        cart.getProductQuantities().clear();
        repository.save(cart);
    }

    public CartDTO patchCart(Long userId, CartDTO patchDto) {
        Cart cart = repository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for userId"));

        if (patchDto.getProductQuantities() != null) {
            for (Map.Entry<Long, Integer> entry : patchDto.getProductQuantities().entrySet()) {
                Long productId = entry.getKey();
                Integer quantity = entry.getValue();

                if (quantity == null || quantity <= 0) {
                    cart.getProductQuantities().remove(productId);
                } else {
                    cart.getProductQuantities().put(productId, quantity);
                }
            }
        }

        return mapper.toDto(repository.save(cart));
    }

    private Cart createCart(Long userId) {
        Cart cart = Cart.builder()
                .userId(userId)
                .productQuantities(new HashMap<>())
                .checkedOut(false)
                .build();
        return repository.save(cart);
    }
}
