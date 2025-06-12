package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatLogDto {
    private Long id;
    private Long userId;
    private String message;
    private String sender;
    private LocalDateTime createdAt;
}
