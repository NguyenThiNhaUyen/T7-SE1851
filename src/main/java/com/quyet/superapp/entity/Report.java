package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long id;

    @Column(name = "report_type", columnDefinition = "VARCHAR", nullable = false)
    private String reportType;

    @ManyToOne
    @JoinColumn(name = "generated_by", referencedColumnName = "user_id")
    private User generatedBy;

    @Column(name = "created_at", columnDefinition = "DATETIME")
    private LocalDateTime createdAt;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
}
