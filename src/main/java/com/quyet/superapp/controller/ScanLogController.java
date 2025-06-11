package com.quyet.superapp.controller;

import com.quyet.superapp.entity.ScanLog;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/scan-logs")
@RequiredArgsConstructor
public class ScanLogController {

    private final ScanLogService service;

    @GetMapping
    public List<ScanLog> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScanLog> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ScanLog create(@RequestBody ScanLog scanLog) {
        return service.create(scanLog);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
