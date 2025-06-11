package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ContactForms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = true)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "name", columnDefinition = "VARCHAR")
    private String name;

    @Column(name = "email", columnDefinition = "VARCHAR")
    private String email;

    @Column(name = "subject", columnDefinition = "VARCHAR")
    private String subject;

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "created_at", columnDefinition = "DATETIME")
    private LocalDateTime createdAt;
}
