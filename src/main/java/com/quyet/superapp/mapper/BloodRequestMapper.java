package com.quyet.superapp.mapper;

import com.quyet.superapp.dto.BloodRequestDTO;
import com.quyet.superapp.entity.BloodRequest;

public class BloodRequestMapper {
    public static BloodRequestDTO toDTO(BloodRequest req) {
        return new BloodRequestDTO(
                req.getBloodRequestId(),
                req.getRequester().getUserId(),
                req.getBloodType().getBloodTypeId(),
                req.getComponent().getBloodComponentId(),
                req.getQuantityMl(),
                req.getUrgencyLevel(),
                req.getStatus(),
                req.getCreatedAt()
        );
    }
}