package org.posthumanlab.network.auth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public authentication endpoint
                .requestMatchers("/api/auth/login").permitAll()

                // Admin-only GET endpoints
                .requestMatchers(HttpMethod.GET, "/api/blog/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/events/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/publications/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/admin/**").hasAuthority("ROLE_ADMIN")

                // Public GET endpoints for published content
                .requestMatchers(HttpMethod.GET, "/api/blog/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/publications/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/media/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/people/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/conversations/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/learning/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/labs/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/curation/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/public/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()

                // Public POST endpoints for user form submissions
                .requestMatchers(HttpMethod.POST, "/api/membership/interests").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/collaboration").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/publications/submit").permitAll()

                // Public member authentication and application submission endpoints
                .requestMatchers("/api/members/**").permitAll()

                // H2 console & Swagger docs
                .requestMatchers("/h2-console/**", "/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()

                // Deployment health/readiness probes
                .requestMatchers("/actuator/health/**", "/actuator/info").permitAll()

                // All other endpoints (admin CRUD & private submissions) require ROLE_ADMIN
                .anyRequest().hasAuthority("ROLE_ADMIN")
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
