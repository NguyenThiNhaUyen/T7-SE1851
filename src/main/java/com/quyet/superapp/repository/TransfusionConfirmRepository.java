package com.quyet.superapp.repository;

import com.quyet.superapp.entity.TransfusionConfirm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TransfusionConfirmRepository extends JpaRepository<TransfusionConfirm, Long> {
    List<TransfusionConfirm> findByRecipientName(String recipientName);
}