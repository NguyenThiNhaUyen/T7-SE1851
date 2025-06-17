package com.quyet.superapp.controller;

import com.quyet.superapp.entity.UserProfile;
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
    public ResponseEntity<UserProfile> getById(@PathVariable Long id) {
        return userProfileService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public UserProfile create(@RequestBody UserProfile obj) {
        return userProfileService.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> update(@PathVariable Long id, @RequestBody UserProfile obj) {
        Optional<UserProfile> existing = userProfileService.getById(id);
        return existing.isPresent()
                ? ResponseEntity.ok(userProfileService.save(obj))
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userProfileService.deleteById(id);
    }
}
