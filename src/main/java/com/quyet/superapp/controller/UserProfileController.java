package com.quyet.superapp.controller;


import com.quyet.superapp.entity.Donation;
import com.quyet.superapp.entity.UserProfile;
import com.quyet.superapp.service.DonationService;
import com.quyet.superapp.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/userprofiles")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping
    public List<UserProfile> getAll() {
        return userProfileService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getById(@PathVariable Integer id) {
        return userProfileService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public UserProfile create(@RequestBody UserProfile obj) {
        return userProfileService.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> update(@PathVariable Integer id, @RequestBody UserProfile obj) {
        Optional<UserProfile> existing = userProfileService.getById(id);
        return existing.isPresent()
                ? ResponseEntity.ok(userProfileService.save(obj))
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        userProfileService.deleteById(id);
    }
}
