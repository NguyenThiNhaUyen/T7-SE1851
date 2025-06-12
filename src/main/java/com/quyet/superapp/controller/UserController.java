package com.quyet.superapp.controller;

import com.quyet.superapp.entity.User;
import com.quyet.superapp.service.UserService;
import com.quyet.superapp.service.UserService1;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService1 userService1;

    @GetMapping
    public List<User> getAll() {
        return userService1.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {

        return userService1.getById(id)

                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public User create(@RequestBody User obj) {
        return userService1.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User obj) {

        Optional<User> existing = userService1.getById(id);

        if (existing.isPresent()) {
            return ResponseEntity.ok(userService1.save(obj));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        userService1.deleteById(id);
    }
}
