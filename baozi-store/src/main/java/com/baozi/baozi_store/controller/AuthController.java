package com.baozi.baozi_store.controller;

import com.baozi.baozi_store.dto.auth.LoginRequest;
import com.baozi.baozi_store.dto.auth.LoginResponse;
import com.baozi.baozi_store.dto.auth.RegisterRequest;
import com.baozi.baozi_store.dto.auth.RegisterResponse;
import com.baozi.baozi_store.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(201).body(authService.register(request));
    }
}
