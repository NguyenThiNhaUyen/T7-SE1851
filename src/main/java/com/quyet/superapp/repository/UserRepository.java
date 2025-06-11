package com.quyet.superapp.repository;

import com.quyet.superapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    long countByActiveTrue();
}
