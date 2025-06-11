package com.quyet.superapp.service;

import com.quyet.superapp.dto.StatResponse;
import com.quyet.superapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;

    public StatResponse getStatistics() {
        // Thực tế bạn nên lấy từ repository
        int donorsToday = (int) userRepository.countByIsEnableTrue(); //giả định active là người đã hiến hôm nay
        int bloodUnits = 450;   //TODO: lấy từ kho máu
        int urgentRequest = 3;  //TODO: lấy từ bảng yêu cầu
        return new StatResponse(donorsToday, bloodUnits, urgentRequest);
    }
}
