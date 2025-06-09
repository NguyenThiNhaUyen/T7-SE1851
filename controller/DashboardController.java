package com.example.blooddonation.controller;

import com.example.blooddonation.model.*;
import com.example.blooddonation.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService service;

    @GetMapping("/stats")
    public Map<String, Integer> getStats() {
        return service.getStats();
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return service.getUsers();
    }

    @GetMapping("/blood-types")
    public List<BloodType> getBloodTypes() {
        return service.getBloodTypes();
    }

    @GetMapping("/compatibility-rules")
    public List<CompatibilityRule> getRules() {
        return service.getCompatibilityRules();
    }

    @GetMapping("/urgent-requests")
    public List<UrgentRequest> getUrgentRequests() {
        return service.getUrgentRequests();
    }
}
