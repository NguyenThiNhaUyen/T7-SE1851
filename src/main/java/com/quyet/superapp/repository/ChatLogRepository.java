package com.quyet.superapp.repository;

import com.quyet.superapp.entity.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {
    List<ChatLog> findByUserId(Long userId);
}