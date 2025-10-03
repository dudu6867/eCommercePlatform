package com.sysco.product_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class BaseController {

    protected <T> ResponseEntity<T> success(T response) {
        return ResponseEntity.ok(response);
    }

    protected <T> ResponseEntity<T> created(T response) {
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    protected ResponseEntity<Void> noContent() {
        return ResponseEntity.noContent().build();
    }

    protected <T> ResponseEntity<T> notFound(T response) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
