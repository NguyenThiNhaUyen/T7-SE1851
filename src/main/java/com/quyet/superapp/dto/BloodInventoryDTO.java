package com.quyet.superapp.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodInventoryDTO {
    private Long bloodInventoryId;
    private Long bloodTypeId;
    private Long componentId;
    private Integer totalQuantityMl;
    private LocalDateTime lastUpdated;
}

