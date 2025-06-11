package com.quyet.superapp.repository;

import com.quyet.superapp.entity.VnPayment;
import com.quyet.superapp.entity.VnPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VnPaymentRepository extends JpaRepository<VnPayment, Integer> {
    long countByStatus(String status);
}