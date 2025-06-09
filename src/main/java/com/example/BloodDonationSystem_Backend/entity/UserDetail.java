package com.example.BloodDonationSystem_Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "UserDetails")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_Detail_Id")
    private Long user_detail_id;

    @Column(name = "FirstName", columnDefinition = "NVARCHAR(10)", nullable = false)
    private String firstname;

    @Column(name = "LastName", columnDefinition = "NVARCHAR(10)", nullable = false)
    private String lastname;

    @Column(name = "Phone", columnDefinition = "CHAR(10)", nullable = false)
    private String phone;

    @Column(name = "Address", columnDefinition = "NVARCHAR(50)", nullable = false)
    private String address;

    @Column(name = "DOB")
    private LocalDate dob;

    @Column(name = "Gender", columnDefinition = "NVARCHAR(10)")
    private String gender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "User_Id")
    private User user;


}
