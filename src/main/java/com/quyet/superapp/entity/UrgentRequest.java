package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "UrgentRequest")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrgentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UrgentRequest_Id")
    private Long urgentRequestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_Id")
    private User user;

    @Column(name = "HospitalName", columnDefinition = "NVARCHAR(100)", nullable = false)
    private String hospitalName;

    @Column(name = "BloodType", columnDefinition = "VARCHAR(5)", nullable = false)
    private String bloodType;

    @Column(name = "Units", nullable = false)
    private int units;

    @Column(name = "RequestDate", columnDefinition = "DATE")
    private LocalDate requestDate;

    @Column(name = "Status", columnDefinition = "NVARCHAR(20)")
    private String status;

    @PrePersist
    public void setDefaultStatus() {
        if (status == null) {
            status = "Pending";
        }
    }
}

