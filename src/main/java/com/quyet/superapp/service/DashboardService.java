package com.quyet.superapp.service;

import com.quyet.superapp.dto.DashboardResponseDTO;
import com.quyet.superapp.repository.DonationRepository;
import com.quyet.superapp.repository.BloodInventoryRepository;
import com.quyet.superapp.repository.UrgentRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DonationRepository donationRepository;
    private final BloodInventoryRepository bloodInventoryRepository;
    private final UrgentRequestRepository urgentRequestRepository;

    public DashboardResponseDTO getDashboardStats() {
        long donorsToday = donationRepository.countByDonationDate(LocalDate.now());
        long totalUnits  = bloodInventoryRepository.sumAllUnits();
        long urgentReqs  = urgentRequestRepository.countByStatus("Pending");

        List<DashboardResponseDTO.GroupStat> groupStats =
                bloodInventoryRepository.findGroupCounts()
                        .stream()
                        .map(arr -> new DashboardResponseDTO.GroupStat(
                                (String) arr[0],
                                ((Number) arr[1]).longValue()
                        ))
                        .collect(Collectors.toList());

        return new DashboardResponseDTO(donorsToday, totalUnits, urgentReqs, groupStats);
    }
}
