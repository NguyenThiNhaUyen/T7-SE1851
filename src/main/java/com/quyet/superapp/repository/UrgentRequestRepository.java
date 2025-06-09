package com.quyet.superapp.repository;

import com.quyet.superapp.entity.UrgentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UrgentRequestRepository extends JpaRepository<UrgentRequest, Long> {
    List<UrgentRequest> findByStatus(String status);
}

