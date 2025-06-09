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
@Table(name = "TransfusionConfirm") // đúng tên trong SQL Server
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransfusionConfirm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // đúng tên trong DB
    private Long id;

    @NotBlank
    @Size(max = 100)

    @Column(name = "recipientName", columnDefinition = "NVARCHAR(50)", nullable = false) // đúng tên trong DB
    private String recipientName;

    @Column(name = "bloodType", columnDefinition = "VARCHAR(5)", nullable = false)
    private String bloodType;

    @Min(1)
    @Column(name = "units", columnDefinition = "VARCHAR(20)", nullable = false)
    private int units;

    @Column(name = "confirmedAt")
    private LocalDateTime confirmedAt;

    @Column(name = "status")
    private String status;
}
