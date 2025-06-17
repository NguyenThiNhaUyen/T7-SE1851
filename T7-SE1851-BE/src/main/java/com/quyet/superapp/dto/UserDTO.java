package com.quyet.superapp.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String password;  // Gợi ý: không nên trả về trong response!
    private boolean enable;   // không nên dùng "isEnable" vì Lombok sẽ tạo `isIsEnable()` gây nhầm lẫn
    private Long roleId;
}

