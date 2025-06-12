package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DonationRegistrationDto {
    private Long id;
    private Long userId;
    private LocalDate readyDate;
    private String status;
}
