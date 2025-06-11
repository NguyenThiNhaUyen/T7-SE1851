package com.quyet.superapp.service;

@Service
@RequiredArgsConstructor
public class DonationService {
    private final DonationRepository repository;

    public List<Donation> getAll() {
        return repository.findAll();
    }

    public Optional<Donation> getById(Integer id) {
        return repository.findById(id);
    }

    public Donation save(Donation donation) {
        return repository.save(donation);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}