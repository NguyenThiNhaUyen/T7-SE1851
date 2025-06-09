package com.quyet.superapp.controller;

import com.quyet.superapp.dto.StatResponse;
import com.quyet.superapp.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public StatResponse getStats() {
        return dashboardService.getStatistics();
    }
}
