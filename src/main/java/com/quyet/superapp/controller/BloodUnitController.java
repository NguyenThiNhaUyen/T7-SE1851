package com.quyet.superapp.controller;
import com.quyet.superapp.entity.BloodUnit;
import com.quyet.superapp.service.BloodUnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bloodunits")
@RequiredArgsConstructor
public class BloodUnitController {

    private final BloodUnitService bloodUnitService;

    @GetMapping
    public List<BloodUnit> getAll() {
        return bloodUnitService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodUnit> getById(@PathVariable Integer id) {
        return bloodUnitService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public BloodUnit create(@RequestBody BloodUnit obj) {
        return bloodUnitService.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BloodUnit> update(@PathVariable Integer id, @RequestBody BloodUnit obj) {
        Optional<BloodUnit> existing = bloodUnitService.getById(id);
        return existing.isPresent()
                ? ResponseEntity.ok(bloodUnitService.save(obj))
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        bloodUnitService.deleteById(id);
    }
}
