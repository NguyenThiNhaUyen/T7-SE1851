package com.quyet.superapp.repository;

import com.quyet.superapp.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    long countByStatus(String status);
}