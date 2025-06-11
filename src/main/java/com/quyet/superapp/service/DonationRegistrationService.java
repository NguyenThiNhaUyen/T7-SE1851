package com.quyet.superapp.service;
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
