package com.example.BloodDonationSystem_Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_Id")
    private String user_id;

    @Column(name = "UserName", columnDefinition = "NVARCHAR(100)", nullable = false)
    private String username;

    @Column(name = "Password", columnDefinition = "VARCHAR(6)", nullable = false)
    private String password;

    @Column(name = "IsEnable")
    private boolean isEnable;

    @Column(name = "Role")
    private String role;

    @Column(name = "Email", columnDefinition = "VARCHAR(50)", nullable = false)
    private String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserDetail userDetail;
}
