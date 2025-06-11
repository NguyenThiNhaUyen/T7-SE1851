package com.quyet.superapp.controller;

import com.quyet.superapp.dto.StatResponse;
import com.quyet.superapp.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public StatResponse getStatistics() {
        return dashboardService.getStatistics();
    }
}
