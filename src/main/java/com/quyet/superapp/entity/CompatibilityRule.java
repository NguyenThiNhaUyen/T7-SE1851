package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CompatibilityRule")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompatibilityRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int compatibilityRuleId;

    @Column(name = "Component", columnDefinition = "NVARCHAR(50)", nullable = false)
    private String component;

    @Column(name = "DonorType", columnDefinition = "VARCHAR(5)", nullable = false)
    private String donorType;

    @Column(name = "RecipientType", columnDefinition = "VARCHAR(5)", nullable = false)
    private String recipientType;

    @Column(name = "IsCompatible", nullable = false)
    private boolean isCompatible;
}
