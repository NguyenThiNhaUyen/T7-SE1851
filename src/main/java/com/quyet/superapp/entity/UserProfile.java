package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "UserProfile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_Id")
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "User_Id")
    private User user;

    @Column(name = "full_name", columnDefinition = "NVARCHAR(20)")
    private String fullName;

    @Column(name = "dob", columnDefinition = "DATE")
    private LocalDate dob;

    @Column(name = "gender", columnDefinition = "NVARCHAR(20)")
    private String gender;

    @Column(name = "blood_type", columnDefinition = "NVARCHAR(20)")
    private String bloodType;

    @Column(name = "address", columnDefinition = "NVARCHAR(20)")
    private String address;

    @Column(name = "phone", columnDefinition = "VARCHAR(10)")
    private String phone;

    @Column(name = "last_donation_date", columnDefinition = "DATE")
    private LocalDate lastDonationDate;

    @Column(name = "recovery_time")
    private Integer recoveryTime;

    @Column(name = "location", columnDefinition = "NVARCHAR(20)")
    private String location;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;
}
