package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Transfusions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transfusion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User recipient;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private BloodRequest request;

    @ManyToOne
    @JoinColumn(name = "blood_unit_id")
    private BloodUnit bloodUnit;

    @Column(name = "transfusion_date", columnDefinition = "DATETIME")
    private LocalDateTime transfusionDate;

    @Column(name = "status", columnDefinition = "VARCHAR")
    private String status;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

}
