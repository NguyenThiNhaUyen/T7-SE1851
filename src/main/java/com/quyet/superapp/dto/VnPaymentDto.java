package com.quyet.superapp.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class VnPaymentDto {
    private Long id;
    private Long userId;
    private BigDecimal amount;
    private LocalDateTime paymentTime;
    private String transactionCode;
    private String status;
}

