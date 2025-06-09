package com.example.BloodDonationSystem_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class RegisterRequest {
    // Thông tin tài khoản
    private String username;
    private String email;
    private String password;

    // Thông tin chi tiết
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private LocalDate dob;
    private String gender;
}
