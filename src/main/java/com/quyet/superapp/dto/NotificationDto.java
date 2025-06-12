package com.quyet.superapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDto {
    private Long id;
    private Long userId;
    private String content;
    private LocalDateTime sentAt;
    private Boolean read;
}
