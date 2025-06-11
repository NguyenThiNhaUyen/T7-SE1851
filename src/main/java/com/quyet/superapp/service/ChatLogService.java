package com.quyet.superapp.service;


import com.quyet.superapp.entity.*;
import com.quyet.superapp.repository.*;
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

    public ChatLog save(ChatLog chatLog) {
        return chatLogRepository.save(chatLog);
    }

    public void delete(Integer id) {
        chatLogRepository.deleteById(id);
    }
}
