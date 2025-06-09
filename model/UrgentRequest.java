package com.example.blooddonation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrgentRequest {
    private String date;
    private String hospital;
    private String bloodType;
    private int units;
    private String status;
}
