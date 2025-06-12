package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserProfileDto {
    private Long userId;
    private String fullName;
    private LocalDate dob;
    private String gender;
    private String bloodType;
    private String address;
    private String phone;
    private LocalDate lastDonationDate;
    private Integer recoveryTime;
    private String location;
    private Float latitude;
    private Float longitude;
}

