package com.quyet.superapp.service;

import com.quyet.superapp.dto.StatResponse;
import com.quyet.superapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final BloodInventoryRepository bloodInventoryRepository;
    private final UrgentRequestRepository urgentRequestRepository;
    private final DonationRepository donationRepository;
    private final BlogRepository blogRepository;
    private final VnPaymentRepository vnPayPaymentRepository;

    public StatResponse getStatistics() {

        int totalUsers = (int) userRepository.count();

        int totalBloodUnits = bloodInventoryRepository.findAll()
                .stream()
                .mapToInt(b -> b.getTotalQuantityMl() != null ? b.getTotalQuantityMl() : 0)
                .sum();

        int pendingUrgentRequests = (int) urgentRequestRepository.countByStatus("Pending");
        int totalDonations = (int) donationRepository.count();
        int activeBlogs = (int) blogRepository.countByStatus("Active");
        int successfulPayments = (int) vnPayPaymentRepository.countByStatus("Success");

        return new StatResponse(
                totalUsers,
                totalBloodUnits,
                pendingUrgentRequests,
                totalDonations,
                activeBlogs,
                successfulPayments
        );
    }
}
