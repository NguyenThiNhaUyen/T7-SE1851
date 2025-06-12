package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UrgentRequestDTO {
    private Long urgentRequestId;
    private String hospitalName;
    private String bloodType;
    private int units;
    private LocalDate requestDate;
    private String status;
    private Long requesterId;
}

