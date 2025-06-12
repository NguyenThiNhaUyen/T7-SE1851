package com.quyet.superapp.service;

import com.quyet.superapp.entity.Notification;
import com.quyet.superapp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public Optional<Notification> getById(Long id) {
        return notificationRepository.findById(id);
    }

    public Notification create(Notification notification) {
        if (notification.getSentAt() == null) {
            notification.setSentAt(LocalDateTime.now());
        }
        notification.setIsRead(false);  // ✅ dùng isRead thay vì read
        return notificationRepository.save(notification);
    }

    public Notification update(Long id, Notification updatedNotification) {
        return notificationRepository.findById(id)
                .map(existing -> {
                    existing.setContent(updatedNotification.getContent());
                    existing.setSentAt(updatedNotification.getSentAt());
                    existing.setIsRead(updatedNotification.getIsRead());  // ✅
                    existing.setUser(updatedNotification.getUser());
                    return notificationRepository.save(existing);
                })
                .orElse(null);
    }

    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }
}
