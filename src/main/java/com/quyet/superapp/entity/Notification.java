package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Notification_Id")
    private Long notification_id;

    @ManyToOne
    @JoinColumn(name = "User_Id")
    private User user;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "sent_at", columnDefinition = "DATETIME")
    private LocalDateTime sentAt;

    @Column(name = "read")
    private Boolean read;
}

