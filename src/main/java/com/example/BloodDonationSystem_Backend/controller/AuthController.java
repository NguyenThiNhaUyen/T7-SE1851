package com.example.BloodDonationSystem_Backend.controller;

import com.example.BloodDonationSystem_Backend.dto.LoginRequest;
import com.example.BloodDonationSystem_Backend.dto.LoginResponse;
import com.example.BloodDonationSystem_Backend.dto.RegisterRequest;
import com.example.BloodDonationSystem_Backend.entity.Role;
import com.example.BloodDonationSystem_Backend.entity.User;
import com.example.BloodDonationSystem_Backend.entity.UserDetail;
import com.example.BloodDonationSystem_Backend.repository.RoleRepository;
import com.example.BloodDonationSystem_Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        Optional<User> optionalUser = userRepository.findByUsername(loginRequest.getUsername());

        if(optionalUser.isEmpty()){
            return ResponseEntity.badRequest().body("Tài khoản không tồn tại");
        }

        User user = optionalUser.get();

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            return ResponseEntity.badRequest().body("Sai mật khẩu");
        }

        //không chặn nếu chưa enable, chỉ thông báo
        LoginResponse loginResponse = new LoginResponse(
                user.getUser_id(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().getName(),
                user.isEnable()
        );
        return ResponseEntity.ok(loginResponse);
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username đã tồn tại");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        // ✅ Tìm role "MEMBER" từ DB
        Role roleMember = roleRepository.findByName("MEMBER")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role MEMBER trong hệ thống"));

        // ✅ Tạo User
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnable(true);
        user.setRole(roleMember); // ⚠️ dùng entity chứ không phải string

        // ✅ Tạo UserDetail
        UserDetail detail = new UserDetail();
        detail.setFirstname(request.getFirstName());
        detail.setLastname(request.getLastName());
        detail.setDob(request.getDob());
        detail.setGender(request.getGender());
        detail.setPhone(request.getPhone());
        detail.setAddress(request.getAddress());

        // Gán liên kết
        detail.setUser(user);
        user.setUserDetail(detail);

        userRepository.save(user); // cascade sẽ lưu cả detail

        return ResponseEntity.ok("Đăng ký thành công");
    }
}
