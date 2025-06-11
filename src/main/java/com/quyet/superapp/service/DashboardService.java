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

        long pendingUrgentRequests = urgentRequestRepository.countByStatus("Pending");
        long totalDonations = donationRepository.count();
        long activeBlogs = blogRepository.countByStatus("Active");
        long successfulPayments = vnPayPaymentRepository.countByStatus("Success");

        return new StatResponse(
                totalUsers,
                totalBloodUnits,
                (int) pendingUrgentRequests,
                (int) totalDonations,
                (int) activeBlogs,
                (int) successfulPayments
        );
    }
}
