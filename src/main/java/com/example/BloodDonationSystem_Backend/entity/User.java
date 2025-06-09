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
    private Long user_id;

    @Column(name = "UserName", columnDefinition = "NVARCHAR(100)", nullable = false)
    private String username;

    @Column(name = "Password", columnDefinition = "VARCHAR(255)", nullable = false)
    private String password; // đủ dài cho BCrypt nếu sau này dùng

    @Column(name = "IsEnable")
    private boolean isEnable;

    @ManyToOne(fetch = FetchType.LAZY) // mặc định sẽ load role luôn khi truy vấn user
    @JoinColumn(name = "Role_Id") //Khóa ngoại của bảng Users
    private Role role;


    @Column(name = "Email", columnDefinition = "VARCHAR(50)", nullable = false, unique = true)
    private String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserDetail userDetail;

}
