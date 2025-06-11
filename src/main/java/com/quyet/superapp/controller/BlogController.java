package com.quyet.superapp.controller;

import com.quyet.superapp.entity.Blog;
import com.quyet.superapp.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog,
                                           @RequestParam(name = "authorId") Long authorId) {
        return ResponseEntity.ok(blogService.save(blog, authorId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
