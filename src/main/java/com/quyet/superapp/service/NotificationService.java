package com.quyet.superapp.service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<Notification> getAll() {
        return notificationRepository.findAll();
    }

    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }
}