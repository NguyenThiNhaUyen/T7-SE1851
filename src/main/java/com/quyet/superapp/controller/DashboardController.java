package com.quyet.superapp.controller;

import com.quyet.superapp.dto.StatResponseDTO;
import com.quyet.superapp.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")  // chỉnh nếu frontend chạy ở host/port khác
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<StatResponseDTO> getStatistics() {
        StatResponseDTO stats = dashboardService.getStatistics();
        return ResponseEntity.ok(stats);
    }
}
