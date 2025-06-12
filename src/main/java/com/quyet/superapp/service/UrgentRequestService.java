package com.quyet.superapp.service;

import com.quyet.superapp.entity.UrgentRequest;
import com.quyet.superapp.entity.User;
import com.quyet.superapp.repository.UrgentRequestRepository;
import com.quyet.superapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UrgentRequestService {
    private final UrgentRequestRepository urgentRepo;
    private final UserRepository userRepository;

    public List<UrgentRequest> getAll() {
        return urgentRepo.findAll();
    }

    public Optional<UrgentRequest> getById(Long id) {
        return urgentRepo.findById(id);
    }

    // ✅ Tạo request và gán user
    public UrgentRequest create(UrgentRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy user với ID: " + userId));

        request.setRequester(user);
        request.setRequestDate(LocalDate.now());

        return urgentRepo.save(request);
    }

    // ✅ Lọc yêu cầu theo user
    public List<UrgentRequest> getByUser(Long userId) {
        return urgentRepo.findByRequesterUserId(userId);
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


