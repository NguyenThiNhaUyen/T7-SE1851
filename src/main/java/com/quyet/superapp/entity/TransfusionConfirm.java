package com.quyet.superapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @NotBlank
    @Size(max = 50)
    @Column(name = "RecipientName", columnDefinition = "NVARCHAR(50)", nullable = false)
    private String recipientName;

    @Column(name = "BloodType", columnDefinition = "VARCHAR(5)", nullable = false)
    private String bloodType;

    @Min(1)
    @Column(name = "Units", nullable = false)
    private int units;

    @Column(name = "ConfirmedAt", columnDefinition = "DATETIME")
    private LocalDateTime confirmedAt;

    @Column(name = "Status", columnDefinition = "NVARCHAR(20)")
    private String status;
}
