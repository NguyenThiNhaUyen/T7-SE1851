package com.quyet.superapp.controller;

import com.quyet.superapp.entity.Reminder;
import com.quyet.superapp.service.ReminderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@RequiredArgsConstructor
public class ReminderController {

    private final ReminderService service;

    @GetMapping
    public List<Reminder> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reminder> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reminder create(@RequestBody Reminder reminder) {
        return service.create(reminder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reminder> update(@PathVariable Integer id, @RequestBody Reminder reminder) {
        Reminder updated = service.update(id, reminder);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
