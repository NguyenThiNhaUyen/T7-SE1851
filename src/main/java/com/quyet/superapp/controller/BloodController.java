package com.quyet.superapp.controller;

import com.quyet.superapp.entity.BloodInventory;
import com.quyet.superapp.entity.CompatibilityRule;
import com.quyet.superapp.entity.UrgentRequest;
import com.quyet.superapp.service.BloodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blood")
@RequiredArgsConstructor
public class BloodController {

    private final BloodService bloodService;

    // --- BLOOD INVENTORY ---

    @GetMapping("/inventory")
    public List<BloodInventory> getAllInventory(@RequestParam(required = false) String type) {
        return type != null ? bloodService.searchBloodByType(type) : bloodService.getInventory();
    }

    @GetMapping("/inventory/{id}")
    public ResponseEntity<BloodInventory> getInventoryById(@PathVariable Long id) {
        return bloodService.getInventoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/inventory")
    public BloodInventory createInventory(@RequestBody BloodInventory inventory) {
        return bloodService.addBlood(inventory);
    }

    @PutMapping("/inventory/{id}")
    public ResponseEntity<BloodInventory> updateInventory(@PathVariable Long id, @RequestBody BloodInventory updated) {
        BloodInventory result = bloodService.updateBlood(id, updated);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/inventory/{id}")
    public void deleteInventory(@PathVariable Long id) {
        bloodService.deleteInventory(id);
    }

    // --- URGENT REQUEST ---

    @GetMapping("/urgent-requests")
    public List<UrgentRequest> getAllUrgentRequests(@RequestParam(required = false) String status) {
        return status != null ? bloodService.searchUrgentByStatus(status) : bloodService.getUrgentRequest();
    }

    @PostMapping("/urgent-requests")
    public UrgentRequest createUrgentRequest(@RequestBody UrgentRequest request) {
        return bloodService.addRequest(request);
    }

    @PutMapping("/urgent-requests/{id}")
    public ResponseEntity<UrgentRequest> updateUrgentRequest(@PathVariable Long id, @RequestBody UrgentRequest updated) {
        UrgentRequest result = bloodService.updateRequest(id, updated);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/urgent-requests/{id}")
    public void deleteUrgentRequest(@PathVariable Long id) {
        bloodService.deleteUrgentRequest(id);
    }

    // --- COMPATIBILITY RULES ---

    @GetMapping("/compatibility-rules")
    public List<CompatibilityRule> getAllCompatibilityRules() {
        return bloodService.getCompatibilityRule();
    }

    @GetMapping("/compatibility/check")
    public List<String> getCompatibleDonors(
            @RequestParam String recipientType,
            @RequestParam String component
    ) {
        return bloodService.getCompatibleDonors(recipientType, component);
    }
}
