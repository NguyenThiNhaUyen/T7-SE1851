package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserProfileDTO {
    private Long userId;
    private String fullName;         // nếu cần tách có thể dùng firstName + lastName
    private LocalDate dob;
    private String gender;
    private String bloodType;
    private String address;
    private String phone;
    private LocalDate lastDonationDate;
    private Integer recoveryTime;    // ngày hồi phục
    private String location;
    private Float latitude;
    private Float longitude;
}

