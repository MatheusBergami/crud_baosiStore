package com.baozi.baozi_store.dto.auth;

public record LoginResponse(
                String token,
                String email,
                String role) {
}
