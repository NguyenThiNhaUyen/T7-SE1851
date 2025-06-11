package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CompatibilityRules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompatibilityRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rule_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "donor_type", referencedColumnName = "type")
    private BloodType donorType;

    @ManyToOne
    @JoinColumn(name = "recipient_type", referencedColumnName = "type")
    private BloodType recipientType;

    @ManyToOne
    @JoinColumn(name = "component_id")
    private BloodComponent component;

    @Column(name = "is_compatible")
    private Boolean isCompatible;
}
