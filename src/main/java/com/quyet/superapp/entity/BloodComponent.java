package com.quyet.superapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name = "Blood_Component_ID")
    private Long bloodComponentId;


    @Column(name = "NameBloodComponent", columnDefinition = "VARCHAR")
    private String name;

    @OneToMany(mappedBy = "component")
    @JsonIgnore
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
