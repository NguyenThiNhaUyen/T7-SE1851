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
@RequestMapping("/api")
@RequiredArgsConstructor
public class BloodController {

    private final BloodService bloodService;

    @GetMapping("/blood-inventory")
    public List<BloodInventory> getBloodInventory(@RequestParam(required = false) String type) {
        if (type != null) return bloodService.searchBloodByType(type);
        return bloodService.getInventory();
    }

    @GetMapping("/blood-inventory/{id}")
    public ResponseEntity<BloodInventory> getBloodInventoryById(@PathVariable Long id) {
        return bloodService.getInventoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/blood-inventory")
    public BloodInventory createBloodInventory(@RequestBody BloodInventory inventory) {
        return bloodService.addBlood(inventory);
    }

    @PutMapping("/blood-inventory/{id}")
    public ResponseEntity<BloodInventory> updateBloodInventory(@PathVariable Long id, @RequestBody BloodInventory updated) {
        BloodInventory result = bloodService.updateBlood(id, updated);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/blood-inventory/{id}")
    public void deleteBloodInventory(@PathVariable Long id) {
        bloodService.deleteInventory(id);
    }



    @GetMapping("/urgent-requests")
    public List<UrgentRequest> getUrgentRequest(@RequestParam(required = false) String status) {
        if (status != null) return bloodService.searchUrgentByStatus(status);
        return bloodService.getUrgentRequest();
    }

    @PostMapping("/urgent-requests")
    public UrgentRequest createUrgentRequest(@RequestBody UrgentRequest request){
        return bloodService.addRequest(request);
    }

    @PutMapping("/urgent-requests/{id}")
    public ResponseEntity<UrgentRequest> updateUrgentRequest(@PathVariable Long id, @RequestBody UrgentRequest updated){
        UrgentRequest result = bloodService.updateRequest(id, updated);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/urgent-requests/{id}")
    public void deleteUrgentRequest(@PathVariable Long id) {
        bloodService.deleteUrgentRequest(id);
    }


    @GetMapping("/blood/compatibility-rules")
    public List<CompatibilityRule> getCompatibilityRules() {
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
