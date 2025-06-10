package com.example.BloodDonationSystem_Backend.service;

import com.example.BloodDonationSystem_Backend.dto.LoginRequest;
import com.example.BloodDonationSystem_Backend.dto.LoginResponse;
import com.example.BloodDonationSystem_Backend.dto.RegisterRequest;
import com.example.BloodDonationSystem_Backend.entity.Role;
import com.example.BloodDonationSystem_Backend.entity.User;
import com.example.BloodDonationSystem_Backend.entity.UserDetail;
import com.example.BloodDonationSystem_Backend.repository.RoleRepository;
import com.example.BloodDonationSystem_Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> login(LoginRequest loginRequest) {
        logger.info("Attempting login for username: {}", loginRequest.getUsername());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> {
                        logger.error("User not found after successful authentication: {}", loginRequest.getUsername());
                        return new RuntimeException("Tài khoản không tồn tại");
                    });

            LoginResponse loginResponse = new LoginResponse(
                    user.getUser_id(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().getName(),
                    user.isEnable()
            );
            logger.info("Login successful for username: {}", loginRequest.getUsername());
            return ResponseEntity.ok(loginResponse);
        } catch (AuthenticationException e) {
            logger.error("Login failed for username: {}. Reason: {}", loginRequest.getUsername(), e.getMessage());
            return ResponseEntity.badRequest().body("Tài khoản hoặc mật khẩu không đúng");
        }
    }

    public ResponseEntity<?> register(RegisterRequest request) {
        logger.info("Attempting registration for username: {}", request.getUsername());
        if (userRepository.existsByUsername(request.getUsername())) {
            logger.warn("Registration failed: Username {} already exists", request.getUsername());
            return ResponseEntity.badRequest().body("Username đã tồn tại");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            logger.warn("Registration failed: Email {} already exists", request.getEmail());
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        Role roleMember = roleRepository.findByName("MEMBER")
                .orElseThrow(() -> {
                    logger.error("Registration failed: Role MEMBER not found");
                    return new RuntimeException("Không tìm thấy role MEMBER trong hệ thống");
                });

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnable(true);
        user.setRole(roleMember);

        UserDetail detail = new UserDetail();
        detail.setFirstname(request.getFirstName());
        detail.setLastname(request.getLastName());
        detail.setDob(request.getDob());
        detail.setGender(request.getGender());
        detail.setPhone(request.getPhone());
        detail.setAddress(request.getAddress());

        detail.setUser(user);
        user.setUserDetail(detail);

        userRepository.save(user);
        logger.info("Registration successful for username: {}", request.getUsername());
        return ResponseEntity.ok("Đăng ký thành công");
    }
}
