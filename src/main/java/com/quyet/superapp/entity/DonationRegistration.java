package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "DonationRegistrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "ready_date", columnDefinition = "DATE")
    private LocalDate readyDate;

    @Column(name = "status", columnDefinition = "VARCHAR")
    private String status;
}
