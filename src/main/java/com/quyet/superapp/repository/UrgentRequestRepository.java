package com.quyet.superapp.repository;

import com.quyet.superapp.entity.UrgentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrgentRequestRepository extends JpaRepository<UrgentRequest, Long> {
    List<UrgentRequest> findByStatus(String status);
    List<UrgentRequest> findByRequesterUserId(Long userId);
    long countByStatus(String status); // nếu có dùng thống kê
}
