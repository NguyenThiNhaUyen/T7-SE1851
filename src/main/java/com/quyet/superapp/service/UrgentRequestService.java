package com.quyet.superapp.service;

import com.quyet.superapp.entity.UrgentRequest;
import com.quyet.superapp.repository.UrgentRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UrgentRequestService {
    private final UrgentRequestRepository urgentRepo;

    public List<UrgentRequest> getAll() {
        return urgentRepo.findAll();
    }

    public Optional<UrgentRequest> getById(Long id) {
        return urgentRepo.findById(id);
    }

    public UrgentRequest create(UrgentRequest request) {
        request.setRequestDate(LocalDate.now());
        return urgentRepo.save(request);
    }

    public UrgentRequest update(Long id, UrgentRequest updated) {
        return urgentRepo.findById(id)
                .map(req -> {
                    req.setHospitalName(updated.getHospitalName());
                    req.setBloodType(updated.getBloodType());
                    req.setUnits(updated.getUnits());
                    req.setStatus(updated.getStatus());
                    return urgentRepo.save(req);
                }).orElse(null);
    }

    public void delete(Long id) {
        urgentRepo.deleteById(id);
    }

    public List<UrgentRequest> searchByStatus(String status) {
        return urgentRepo.findByStatus(status);
    }
}
