package com.quyet.superapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AchievementService {
    private final AchievementRepository achievementRepository;

    public List<Achievement> getAll() {
        return achievementRepository.findAll();
    }

    public Achievement save(Achievement achievement) {
        return achievementRepository.save(achievement);
    }
}