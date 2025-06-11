package com.quyet.superapp.controller;


import com.quyet.superapp.entity.Blog;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService service;

    @GetMapping
    public List<Blog> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Blog create(@RequestBody Blog blog) {
        return service.create(blog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> update(@PathVariable Integer id, @RequestBody Blog blog) {
        Blog updated = service.update(id, blog);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
