package com.quyet.superapp.repository;

import com.quyet.superapp.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    long countByStatus(String status);
}