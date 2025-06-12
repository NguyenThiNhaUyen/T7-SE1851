package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DonationDto {
    private Long id;
    private Long userId;
    private Long registrationId;
    private Long bloodTypeId;
    private Long componentId;
    private LocalDate donationDate;
    private Integer volumeMl;
    private String location;
    private String notes;
}

