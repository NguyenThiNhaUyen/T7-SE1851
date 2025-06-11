package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "BloodUnits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "blood_type", referencedColumnName = "type")
    private BloodType bloodType;

    @ManyToOne
    @JoinColumn(name = "component_id")
    private BloodComponent component;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    private Donation donation;

    @Column(name = "quantity_ml")
    private Integer quantityMl;

    @Column(name = "expiration_date", columnDefinition = "DATE")
    private LocalDate expirationDate;

    @Column(name = "status", columnDefinition = "VARCHAR")
    private String status;

    @Column(name = "stored_at", columnDefinition = "DATETIME")
    private LocalDateTime storedAt;
}
