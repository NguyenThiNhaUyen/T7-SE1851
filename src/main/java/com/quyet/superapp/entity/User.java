package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Integer id;

    @Column(name = "Username", nullable = false, unique = true, columnDefinition = "VARCHAR")
    private String username;

    @Column(name = "Email", nullable = false, unique = true, columnDefinition = "VARCHAR")
    private String email;

    @Column(name = "Password", columnDefinition = "VARCHAR")
    private String password;

    @Column(name = "Role", columnDefinition = "VARCHAR")
    private String role; // Guest, Member, Staff, Admin

    @Column(name = "Enable")
    private Boolean enable;

    // Quan hệ 1-1
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserProfile userProfile;

    // Quan hệ 1-n
    @OneToMany(mappedBy = "user")
    private List<Donation> donations;

    @OneToMany(mappedBy = "user")
    private List<DonationRegistration> donationRegistrations;

    @OneToMany(mappedBy = "requester")
    private List<BloodRequest> bloodRequests;

    @OneToMany(mappedBy = "user")
    private List<Reminder> reminders;

    @OneToMany(mappedBy = "user")
    private List<ChatLog> chatLogs;

    @OneToMany(mappedBy = "user")
    private List<ScanLog> scanLogs;

    @OneToMany(mappedBy = "scannedBy")
    private List<ScanLog> scannedLogs;

    @OneToMany(mappedBy = "user")
    private List<Achievement> achievements;

    @OneToMany(mappedBy = "author")
    private List<Blog> blogs;

    @OneToMany(mappedBy = "user")
    private List<ContactForm> contactForms;

    @OneToMany(mappedBy = "generatedBy")
    private List<Report> reports;

    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;
}
