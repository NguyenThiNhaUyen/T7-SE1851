package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "BloodInventory")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BloodInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BloodInventoryId")
    private Long bloodInventoryId;

    @Column(name = "BloodType", columnDefinition = "VARCHAR(5)", nullable = false)
    private String bloodType;

    @Column(name = "Quantity", nullable = false)
    private int quantity;

    @Column(name = "LastUpdated", columnDefinition = "DATETIME")
    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        lastUpdated = LocalDateTime.now();
    }
}
