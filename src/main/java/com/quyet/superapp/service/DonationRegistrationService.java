package com.quyet.superapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.quyet.superapp.entity.DonationRegistration;
import com.quyet.superapp.repository.DonationRegistrationRepository;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DonationRegistrationService {
    private final DonationRegistrationRepository repository;

    public List<DonationRegistration> getAll() {
        return repository.findAll();
    }

    public Optional<DonationRegistration> getById(Integer id) {
        return repository.findById(id);
    }

    public DonationRegistration save(DonationRegistration registration) {
        return repository.save(registration);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
