package com.quyet.superapp.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatResponse {
    private int donorsToday;
    private int bloodUnits;
    private int urgentRequest;
}
