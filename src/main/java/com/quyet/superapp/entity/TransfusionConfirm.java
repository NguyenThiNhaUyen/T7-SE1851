package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "TransfusionConfirm")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransfusionConfirm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TransfusionConfirmId")
    private Long transfusionConfirmId;

    @Column(name = "RecipientName", nullable = false, length = 50)
    private String recipientName;

    @Column(name = "BloodType", nullable = false, length = 5)
    private String bloodType;

    @Column(name = "Units", nullable = false)
    private int units;

    @Column(name = "ConfirmedAt")
    private LocalDateTime confirmedAt;

    @Column(name = "Status", length = 20)
    private String status;
}
