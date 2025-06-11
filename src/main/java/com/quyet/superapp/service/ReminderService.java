package com.quyet.superapp.service;

@Service
@RequiredArgsConstructor
public class ReminderService {
    private final ReminderRepository reminderRepository;

    public List<Reminder> getAll() {
        return reminderRepository.findAll();
    }

    public Reminder save(Reminder reminder) {
        return reminderRepository.save(reminder);
    }
}