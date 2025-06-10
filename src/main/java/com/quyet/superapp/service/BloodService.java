package com.quyet.superapp.service;

import com.quyet.superapp.entity.BloodInventory;
import com.quyet.superapp.entity.CompatibilityRule;
import com.quyet.superapp.entity.UrgentRequest;
import com.quyet.superapp.repository.BloodInventoryRepository;
import com.quyet.superapp.repository.CompatibilityRuleRepository;
import com.quyet.superapp.repository.UrgentRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BloodService {
    private final BloodInventoryRepository bloodRepo;
    private final CompatibilityRuleRepository ruleRepo;
    private final UrgentRequestRepository urgentRepo;

    public List<BloodInventory> getInventory() {
        return bloodRepo.findAll();
    }

    public Optional<BloodInventory> getInventoryById(Long id) {
        return bloodRepo.findById(id);
    }

    public BloodInventory addBlood(BloodInventory inventory) {
        inventory.setLastUpdated(LocalDateTime.now());
        return bloodRepo.save(inventory);
    }

    public BloodInventory updateBlood(Long id, BloodInventory updated) {
        return bloodRepo.findById(id)
                .map(blood -> {
                    blood.setBloodType(updated.getBloodType());
                    blood.setQuantity(updated.getQuantity());
                    blood.setLastUpdated(LocalDateTime.now());
                    return bloodRepo.save(blood);
                }).orElse(null);
    }

    public void deleteInventory(Long id) {
        bloodRepo.deleteById(id);
    }



    public List<UrgentRequest> getUrgentRequest() {
        return urgentRepo.findAll();
    }

    public UrgentRequest addRequest(UrgentRequest request) {
        request.setRequestDate(LocalDate.now());
        return urgentRepo.save(request);
    }

    public UrgentRequest updateRequest(Long id, UrgentRequest updated) {
        return urgentRepo.findById(id)
                .map(req -> {
                    req.setHospitalName(updated.getHospitalName());
                    req.setBloodType(updated.getBloodType());
                    req.setUnits(updated.getUnits());
                    req.setStatus(updated.getStatus());
                    return urgentRepo.save(req);
                }).orElse(null);
    }

    public void deleteUrgentRequest(Long id) {
        urgentRepo.deleteById(id);
    }

    public List<CompatibilityRule> getCompatibilityRule() {
        return ruleRepo.findAll();
    }

    public List<UrgentRequest> searchUrgentByStatus(String status){
        return urgentRepo.findByStatus(status);
    }

    public List<BloodInventory> searchBloodByType(String bloodType){
        return bloodRepo.findByBloodType(bloodType);
    }

    public List<String> getCompatibleDonors(String recipientType, String component) {
        return ruleRepo.findByRecipientTypeAndComponentAndIsCompatibleTrue(recipientType, component)
                .stream()
                .map(CompatibilityRule::getDonorType)
                .distinct()
                .toList(); // hoặc collect(Collectors.toList()) nếu dùng Java <17
    }



}
