package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ChatLogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = true)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "sender", columnDefinition = "VARCHAR")
    private String sender;

    @Column(name = "created_at", columnDefinition = "DATETIME")
    private LocalDateTime createdAt;
}
