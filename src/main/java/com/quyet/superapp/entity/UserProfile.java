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
    @Column(name = "user_id")
    private Integer userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "full_name", columnDefinition = "VARCHAR")
    private String fullName;

    @Column(name = "dob", columnDefinition = "DATE")
    private LocalDate dob;

    @Column(name = "gender", columnDefinition = "VARCHAR")
    private String gender;

    @Column(name = "blood_type", columnDefinition = "VARCHAR")
    private String bloodType;

    @Column(name = "address", columnDefinition = "VARCHAR")
    private String address;

    @Column(name = "phone", columnDefinition = "VARCHAR")
    private String phone;

    @Column(name = "last_donation_date", columnDefinition = "DATE")
    private LocalDate lastDonationDate;

    @Column(name = "recovery_time")
    private Integer recoveryTime;

    @Column(name = "location", columnDefinition = "VARCHAR")
    private String location;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;
}
