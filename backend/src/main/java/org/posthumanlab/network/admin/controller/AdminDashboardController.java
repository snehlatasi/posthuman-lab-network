package org.posthumanlab.network.admin.controller;

import org.posthumanlab.network.admin.dto.AdminDashboardStatsDto;
import org.posthumanlab.network.admin.service.AdminDashboardStatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    private final AdminDashboardStatsService dashboardStatsService;

    public AdminDashboardController(AdminDashboardStatsService dashboardStatsService) {
        this.dashboardStatsService = dashboardStatsService;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminDashboardStatsDto> getDashboardStats() {
        return ResponseEntity.ok(dashboardStatsService.getDashboardStats());
    }
}
