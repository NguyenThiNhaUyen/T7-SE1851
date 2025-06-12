package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BloodInventoryDto {
    private Long id;
    private Long bloodTypeId;
    private Long componentId;
    private Integer totalQuantityMl;
    private LocalDateTime lastUpdated;
}
