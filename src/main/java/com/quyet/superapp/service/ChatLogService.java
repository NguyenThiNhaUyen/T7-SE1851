package com.quyet.superapp.service;

import com.quyet.superapp.entity.ChatLog;
import com.quyet.superapp.repository.ChatLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatLogService {
    private final ChatLogRepository chatLogRepository;

    public List<ChatLog> getAll() {
        return chatLogRepository.findAll();
    }

    public List<ChatLog> getByUser(Long userId) {
        return chatLogRepository.findByUser_UserId(userId);
    }

    public ChatLog create(ChatLog chatLog) {
        return chatLogRepository.save(chatLog);
    }

    public void delete(Long id) {
        chatLogRepository.deleteById(id);
    }
}
