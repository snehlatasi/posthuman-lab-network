package org.posthumanlab.network.auth.service;

import org.posthumanlab.network.auth.dto.LoginRequest;
import org.posthumanlab.network.auth.dto.LoginResponse;
import org.posthumanlab.network.auth.entity.AdminUser;
import org.posthumanlab.network.auth.repository.AdminUserRepository;
import org.posthumanlab.network.auth.security.JwtTokenProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public LoginResponse login(LoginRequest request) {
        AdminUser user = adminUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = tokenProvider.generateToken(user.getEmail());
        return new LoginResponse(token, user.getEmail(), user.getName());
    }
}
