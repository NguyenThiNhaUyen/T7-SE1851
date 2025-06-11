package com.quyet.superapp.controller;

import com.quyet.superapp.entity.ChatLog;
import com.quyet.superapp.service.ChatLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat-logs")
@RequiredArgsConstructor
public class ChatLogController {

    private final ChatLogService service;

    @GetMapping
    public List<ChatLog> getAll() {
        return service.getAll();
    }

    @GetMapping("/user/{userId}")
    public List<ChatLog> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    @PostMapping("/create")
    public ChatLog create(@RequestBody ChatLog chatLog) {
        return service.create(chatLog);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
