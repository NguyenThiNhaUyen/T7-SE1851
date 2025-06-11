    package com.quyet.superapp.controller;

    import com.quyet.superapp.service.AchievementService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/achievements")
    @RequiredArgsConstructor
    public class AchievementController {

        private final AchievementService service;

        @GetMapping
        public List<Achievement> getAll() {
            return service.getAll();
        }

        @GetMapping("/{id}")
        public ResponseEntity<Achievement> getById(@PathVariable Integer id) {
            return service.getById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        @PostMapping
        public Achievement create(@RequestBody Achievement achievement) {
            return service.create(achievement);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Achievement> update(@PathVariable Integer id, @RequestBody Achievement achievement) {
            Achievement updated = service.update(id, achievement);
            return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
        }

        @DeleteMapping("/{id}")
        public void delete(@PathVariable Integer id) {
            service.delete(id);
        }
    }
