package com.quyet.superapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "CompatibilityRule")
@AllArgsConstructor
@NoArgsConstructor
public class CompatibilityRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String component;
    private String donorType;
    private String recipientType;
    private boolean isCompatible;
}
