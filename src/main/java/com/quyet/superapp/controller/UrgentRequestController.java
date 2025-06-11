package com.quyet.superapp.controller;

import com.quyet.superapp.entity.UrgentRequest;
import com.quyet.superapp.service.UrgentRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/urgent-requests")
@RequiredArgsConstructor
public class UrgentRequestController {

    private final UrgentRequestService service;

    @GetMapping
    public List<UrgentRequest> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UrgentRequest> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public UrgentRequest create(@RequestBody UrgentRequest urgentRequest) {
        return service.create(urgentRequest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UrgentRequest> update(@PathVariable Long id, @RequestBody UrgentRequest updated) {
        UrgentRequest result = service.update(id, updated);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
