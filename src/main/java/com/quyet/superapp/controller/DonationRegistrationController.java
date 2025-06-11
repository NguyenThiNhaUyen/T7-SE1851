package com.quyet.superapp.controller;

import com.quyet.superapp.entity.DonationRegistration;
import com.quyet.superapp.service.DonationRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donationregistrations")
@RequiredArgsConstructor
public class DonationRegistrationController {

    private final DonationRegistrationService donationRegistrationService;

    @GetMapping
    public List<DonationRegistration> getAll() {
        return donationRegistrationService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonationRegistration> getById(@PathVariable Integer id) {
        return donationRegistrationService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public DonationRegistration create(@RequestBody DonationRegistration obj) {
        return donationRegistrationService.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonationRegistration> update(@PathVariable Integer id, @RequestBody DonationRegistration obj) {
        Optional<DonationRegistration> existing = donationRegistrationService.getById(id);
        return existing.isPresent()
                ? ResponseEntity.ok(donationRegistrationService.save(obj))
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        donationRegistrationService.deleteById(id);
    }
}
