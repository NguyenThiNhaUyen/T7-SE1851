package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "BloodRequests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BloodRequestID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "RequesterID")
    private User requester;

    @ManyToOne
    @JoinColumn(name = "BloodType", referencedColumnName = "type")
    private BloodType bloodType;

    @ManyToOne
    @JoinColumn(name = "ComponentID")
    private BloodComponent component;

    @Column(name = "QuantityML")
    private Integer quantityMl;

    @Column(name = "UrgencyLevel", columnDefinition = "VARCHAR")
    private String urgencyLevel;

    @Column(name = "Status", columnDefinition = "VARCHAR")
    private String status;

    @Column(name = "CreatedAt", columnDefinition = "DATETIME")
    private LocalDateTime createdAt;
}
