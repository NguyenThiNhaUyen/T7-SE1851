package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "VnPayPayments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VnPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Column(name = "amount", precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "payment_time", columnDefinition = "DATETIME")
    private LocalDateTime paymentTime;

    @Column(name = "transaction_code", columnDefinition = "VARCHAR(100)")
    private String transactionCode;

    @Column(name = "status", columnDefinition = "VARCHAR(20)")
    private String status;
}
