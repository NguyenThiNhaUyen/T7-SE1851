package com.quyet.superapp.service;

@Service
@RequiredArgsConstructor
public class BloodUnitService {
    private final BloodUnitRepository repository;

    public List<BloodUnit> getAll() {
        return repository.findAll();
    }

    public Optional<BloodUnit> getById(Integer id) {
        return repository.findById(id);
    }

    public BloodUnit save(BloodUnit unit) {
        return repository.save(unit);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
