package com.quyet.superapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransfusionConfirmRepository extends JpaRepository<TransfusionConfirm, Long> {
    List<TransfusionConfirm> findByRecipientName(String recipientName);

}
