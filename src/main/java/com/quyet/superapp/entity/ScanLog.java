package com.quyet.superapp.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ScanLogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScanLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "scanned_by")
    private User scannedBy;

    @Column(name = "scan_time", columnDefinition = "DATETIME")
    private LocalDateTime scanTime;

    @Column(name = "location", columnDefinition = "VARCHAR")
    private String location;
}
