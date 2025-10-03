package com.sysco.cart_service.exception;

public class CartItemValidationException extends RuntimeException {
    public CartItemValidationException(String message) {
        super(message);
    }
}