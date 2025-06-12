package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BlogDto {
    private Long id;
    private String title;
    private Long authorId;
    private String content;
    private LocalDateTime createdAt;
    private String status;
}