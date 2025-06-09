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
@Table(name = "TransfusionConfirm") // tên bảng đúng như SQL Server
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransfusionConfirm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // phải đúng như tên cột trong DB
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "recipientName") // đúng tên cột trong DB
    private String recipientName;

    @Column(name = "bloodType") // đúng tên cột trong DB
    private String bloodType;

    @Min(1)
    @Column(name = "units") // đúng tên cột trong DB
    private int units;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") // định dạng ISO chuẩn
    @Column(name = "confirmedAt") // đúng tên cột trong DB
    private LocalDateTime confirmedAt;

    @Column(name = "status") // đúng tên cột trong DB
    private String status;
}
