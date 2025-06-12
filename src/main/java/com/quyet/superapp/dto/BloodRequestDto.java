package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BloodRequestDto {
    private Long id;
    private Long requesterId;
    private Long bloodTypeId;
    private Long componentId;
    private Integer quantityMl;
    private String urgencyLevel;
    private String status;
    private LocalDateTime createdAt;
}
