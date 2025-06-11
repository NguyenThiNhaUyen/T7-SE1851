package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "BloodComponents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BloodComponentID")
    private Long id;

    @Column(name = "NameBloodComponent", columnDefinition = "VARCHAR")
    private String name;

    @OneToMany(mappedBy = "component")
    private List<CompatibilityRule> compatibilityRules;

    @OneToMany(mappedBy = "component")
    private List<Donation> donations;

    @OneToMany(mappedBy = "component")
    private List<BloodUnit> bloodUnits;

    @OneToMany(mappedBy = "component")
    private List<BloodInventory> inventories;

    @OneToMany(mappedBy = "component")
    private List<BloodRequest> requests;
}
