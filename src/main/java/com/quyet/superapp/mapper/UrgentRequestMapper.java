package com.quyet.superapp.mapper;

import com.quyet.superapp.dto.UrgentRequestDTO;
import com.quyet.superapp.entity.UrgentRequest;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UrgentRequestMapper {

    @Mapping(target = "requesterId", source = "requester.userId")
    UrgentRequestDTO toDto(UrgentRequest entity);

    @Mapping(target = "urgentRequestId", ignore = true)
    @Mapping(target = "status", ignore = true)         // để @PrePersist set default
    @Mapping(target = "requester", ignore = true)      // sẽ set trong Service
    @Mapping(target = "requestDate", ignore = true)    // sẽ set trong Service
    UrgentRequest toEntity(UrgentRequestDTO dto);
}
