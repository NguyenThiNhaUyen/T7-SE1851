package com.example.blooddonation.service;

import com.example.blooddonation.model.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DashboardService {
    public Map<String, Integer> getStats() {
        return Map.of("donorsToday", 25, "bloodUnits", 450, "urgentRequests", 3);
    }

    public List<User> getUsers() {
        return List.of(
            new User("admin", "admin@example.com", "Quản trị", "Hoạt động"),
            new User("user1", "user1@example.com", "Nhân viên", "Hoạt động")
        );
    }

    public List<BloodType> getBloodTypes() {
        return List.of(
            new BloodType("O+", "Phổ biến"),
            new BloodType("AB-", "Hiếm")
        );
    }

    public List<CompatibilityRule> getCompatibilityRules() {
        return List.of(
            new CompatibilityRule("Hồng cầu", "O-", "A+", true),
            new CompatibilityRule("Huyết tương", "AB+", "O-", false)
        );
    }

    public List<UrgentRequest> getUrgentRequests() {
        return List.of(
            new UrgentRequest("04/05/2024", "Bệnh viện TP", "O+", 6, "Đang chờ"),
            new UrgentRequest("04/05/2024", "Phòng khám Mercy", "O−", 2, "Đang chờ")
        );
    }
}
