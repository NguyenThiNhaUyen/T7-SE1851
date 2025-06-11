package com.quyet.superapp.service;

import com.quyet.superapp.entity.UserProfile;
import com.quyet.superapp.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository repository;

    public List<UserProfile> getAll() {
        return repository.findAll();
    }

    public Optional<UserProfile> getById(Integer id) {
        return repository.findById(id);
    }

    public UserProfile save(UserProfile profile) {
        return repository.save(profile);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
