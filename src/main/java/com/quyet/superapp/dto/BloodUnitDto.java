package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BloodUnitDto {
    private Long id;
    private Long bloodTypeId;
    private Long componentId;
    private Long donationId;
    private Integer quantityMl;
    private LocalDate expirationDate;
    private String status;
    private LocalDateTime storedAt;
}

