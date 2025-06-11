    package com.quyet.superapp.entity;

    import jakarta.persistence.*;
    import lombok.*;
    import java.time.LocalDate;

    @Entity
    @Table(name = "Donations")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Donation {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        @ManyToOne
        @JoinColumn(name = "registration_id")
        private DonationRegistration registration;

        @ManyToOne
        @JoinColumn(name = "BloodType", referencedColumnName = "BloodTypeID")
        private BloodType bloodType;



        @ManyToOne
        @JoinColumn(name = "component_id")
        private BloodComponent component;

        @Column(name = "donation_date", columnDefinition = "DATE")
        private LocalDate donationDate;

        @Column(name = "volume_ml")
        private Integer volumeMl;

        @Column(name = "location", columnDefinition = "VARCHAR")
        private String location;

        @Column(name = "notes", columnDefinition = "TEXT")
        private String notes;
    }
