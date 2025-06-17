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

    @PostMapping("/create/{userId}")
    public UrgentRequest create(@RequestBody UrgentRequest urgentRequest, @PathVariable Long userId) {
        return service.create(urgentRequest, userId);
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

    // ✅ Mới thêm: lọc theo trạng thái yêu cầu
    @GetMapping("/status/{status}")
    public List<UrgentRequest> getByStatus(@PathVariable String status) {
        return service.searchByStatus(status);
    }

    // ✅ Mới thêm: lọc theo người gửi yêu cầu
    @GetMapping("/user/{userId}")
    public List<UrgentRequest> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }
}

