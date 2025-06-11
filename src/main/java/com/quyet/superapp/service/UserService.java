package com.quyet.superapp.service;


import com.quyet.superapp.dto.LoginRequest;
import com.quyet.superapp.dto.LoginResponse;
import com.quyet.superapp.dto.RegisterRequest;
import com.quyet.superapp.entity.Role;
import com.quyet.superapp.entity.User;
import com.quyet.superapp.entity.UserDetail;
import com.quyet.superapp.repository.RoleRepository;
import com.quyet.superapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

            LoginResponse loginResponse = new LoginResponse(
                    user.getUser_id(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().getName(),
                    user.isEnable()
            );
            return ResponseEntity.ok(loginResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body("Tài khoản hoặc mật khẩu không đúng");
        }
    }

    public ResponseEntity<?> register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username đã tồn tại");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        Role roleMember = roleRepository.findByName("MEMBER")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role MEMBER trong hệ thống"));

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
        return ResponseEntity.ok("Đăng ký thành công");
    }

}
