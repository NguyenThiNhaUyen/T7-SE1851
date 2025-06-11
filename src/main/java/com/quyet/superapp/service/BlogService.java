package com.quyet.superapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;

    public List<Blog> getAll() {
        return blogRepository.findAll();
    }

    public Blog save(Blog blog) {
        return blogRepository.save(blog);
    }
}
