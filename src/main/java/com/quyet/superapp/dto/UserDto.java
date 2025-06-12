package com.quyet.superapp.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String username;
    private String email;
    private String password;
    private boolean isEnable;
    private int roleId;
}

