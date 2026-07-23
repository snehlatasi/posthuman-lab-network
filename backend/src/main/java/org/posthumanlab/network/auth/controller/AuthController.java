package org.posthumanlab.network.auth.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.auth.dto.LoginRequest;
import org.posthumanlab.network.auth.dto.LoginResponse;
import org.posthumanlab.network.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
