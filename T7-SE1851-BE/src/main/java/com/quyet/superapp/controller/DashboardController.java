package com.quyet.superapp.controller;

import com.quyet.superapp.dto.StatResponseDTO;
import com.quyet.superapp.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public StatResponseDTO getStatistics() {
        return dashboardService.getStatistics();
    }
}
