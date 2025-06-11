package com.quyet.superapp.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "BloodTypes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodType {

    @Id
    @Column(name = "BloodTypeID", columnDefinition = "VARCHAR")
    private String type;

    @Column(name = "Description", columnDefinition = "VARCHAR")
    private String description;

    @OneToMany(mappedBy = "bloodType")
    private List<Donation> donations;

    @OneToMany(mappedBy = "bloodType")
    private List<BloodUnit> bloodUnits;

    @OneToMany(mappedBy = "bloodType")
    private List<BloodInventory> bloodInventories;

    @OneToMany(mappedBy = "bloodType")
    private List<BloodRequest> bloodRequests;

    @OneToMany(mappedBy = "donorType")
    private List<CompatibilityRule> donorRules;

    @OneToMany(mappedBy = "recipientType")
    private List<CompatibilityRule> recipientRules;
}
