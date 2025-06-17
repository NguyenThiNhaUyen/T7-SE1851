package com.quyet.superapp.config;

import com.quyet.superapp.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder builder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        builder.authenticationProvider(authenticationProvider());
        return builder.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // ⚠️ Đổi đúng port FE của bạn
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                        //QUYỀN MEMBER
                        .requestMatchers(MEMBER_ENDPOINTS).hasAnyRole("MEMBER", "ADMIN")
                        //QUYỀN STAFF
                        .requestMatchers(STAFF_ENDPOINTS).hasAnyRole("STAFF", "ADMIN")
                        //QUYỂN ADMIN
                        .requestMatchers(ADMIN_ENDPOINTS).hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterAfter((request, response, chain) -> {
                    HttpServletRequest httpRequest = (HttpServletRequest) request;
                    System.out.println("Authorization header: " + httpRequest.getHeader("Authorization"));
                    System.out.println("➡️ URI: " + httpRequest.getRequestURI());  // Thêm dòng này
                    System.out.println("➡️ Method: " + httpRequest.getMethod());   // Và dòng này
                    chain.doFilter(request, response);
                }, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();

    }

    private static final String[] PUBLIC_ENDPOINTS = {
            "/api/auth/**",
            "/api/verify-otp",
            "/api/forgot",
            "/api/change-password",
            "/api/blog/**",
            "/api/public/**"
    };

    private static final String[] MEMBER_ENDPOINTS = {
            "/api/user/**",
            "/api/profile",
            "/api/donation/**",
            "/api/request/**",
            "/api/transfusion/history",
            "/api/blood/**",
            "/api/vnpay/**"
    };

    private static final String[] STAFF_ENDPOINTS = {
            "/api/staff/**"

    };

    private static final String[] ADMIN_ENDPOINTS = {
            "/api/admin",
            "/api/users/**",
            "/api/roles/**",
            "/api/notifications/**"
    };
}
