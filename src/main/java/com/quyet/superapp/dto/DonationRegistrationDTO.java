package com.quyet.superapp.dto;

import lombok.*;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationRegistrationDTO {
    private Long registrationId;
    private Long userId;
    private LocalDate readyDate;
    private String status;
}

