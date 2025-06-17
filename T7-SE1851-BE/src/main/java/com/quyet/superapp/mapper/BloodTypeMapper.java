package com.quyet.superapp.mapper;

import com.quyet.superapp.dto.BloodTypeDTO;
import com.quyet.superapp.entity.BloodType;

public class BloodTypeMapper {
    public static BloodTypeDTO toDTO(BloodType type) {
        return new BloodTypeDTO(type.getBloodTypeId(), type.getDescription());
    }
}