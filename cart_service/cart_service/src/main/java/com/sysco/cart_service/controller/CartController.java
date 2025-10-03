package com.sysco.cart_service.controller;

import com.sysco.cart_service.dto.CartDTO;
import com.sysco.cart_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<CartDTO> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<CartDTO> addProduct(@PathVariable Long userId, @PathVariable Long productId) {
        return ResponseEntity.ok(cartService.addProductToCart(userId, productId));
    }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<CartDTO> removeProduct(@PathVariable Long userId, @PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeProductFromCart(userId, productId));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<CartDTO> patchCart(@PathVariable Long userId, @RequestBody CartDTO cartDTO) {
        return ResponseEntity.ok(cartService.patchCart(userId, cartDTO));
    }
}

