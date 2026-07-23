package org.posthumanlab.network.auth.security;

import org.posthumanlab.network.auth.entity.AdminUser;
import org.posthumanlab.network.auth.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_EMAIL:admin@posthumanlab.org}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD:AdminSecret123!}")
    private String adminPassword;

    public AdminInitializer(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!adminUserRepository.existsByEmail(adminEmail)) {
            AdminUser admin = new AdminUser();
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode(adminPassword));
            admin.setName("System Administrator");
            adminUserRepository.save(admin);
        }
    }
}
