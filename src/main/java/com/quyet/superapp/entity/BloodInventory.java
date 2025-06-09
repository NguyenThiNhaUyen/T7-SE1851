package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "BloodInventory")
@AllArgsConstructor
@NoArgsConstructor
public class BloodInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodType;
    private int quantity;

    private LocalDateTime lastUpdated;
}
