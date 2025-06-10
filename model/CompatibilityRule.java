package com.example.blooddonation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompatibilityRule {
    private String component;
    private String donor;
    private String recipient;
    private boolean compatible;
}
