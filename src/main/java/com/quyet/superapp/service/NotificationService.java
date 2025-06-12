package com.quyet.superapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.quyet.superapp.entity.Notification;
import com.quyet.superapp.repository.NotificationRepository;

import java.time.LocalDateTime;
import java.util.List;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<Notification> getAll() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> getById(Integer id) {
        return notificationRepository.findById(Long.valueOf(id));
    }

    public Notification create(Notification notification) {
        if (notification.getSentAt() == null) {
            notification.setSentAt(LocalDateTime.now());
        }
        notification.setRead(false); // default chưa đọc
        return notificationRepository.save(notification);
    }

    public Notification update(Integer id, Notification updatedNotification) {
        return notificationRepository.findById(Long.valueOf(id))
                .map(existing -> {
                    existing.setContent(updatedNotification.getContent());
                    existing.setSentAt(updatedNotification.getSentAt());
                    existing.setRead(updatedNotification.getRead());
                    existing.setUser(updatedNotification.getUser());
                    return notificationRepository.save(existing);
                })
                .orElse(null);
    }

    public void delete(Integer id) {
        notificationRepository.deleteById(Long.valueOf(id));
    }
}
