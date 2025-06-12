package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReportDto {
    private Long id;
    private String reportType;
    private Long generatedById;
    private LocalDateTime createdAt;
    private String content;
}
