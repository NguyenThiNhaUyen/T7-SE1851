package com.quyet.superapp.mapper;

import com.quyet.superapp.dto.BloodRequestDto;
import com.quyet.superapp.entity.BloodRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BloodRequestMapper {
    BloodRequestDto toDto(BloodRequest entity);

    BloodRequest toEntity(BloodRequestDto dto);
}
