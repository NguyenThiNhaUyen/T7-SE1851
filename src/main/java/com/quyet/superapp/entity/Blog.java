package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Blog")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title", columnDefinition = "VARCHAR")
    private String title;

    @ManyToOne
    @JoinColumn(name = "AuthorId")
    private User author;

    @Column(name = "Content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    private LocalDateTime createdAt;

    @Column(name = "Status", columnDefinition = "VARCHAR")
    private String status;
}