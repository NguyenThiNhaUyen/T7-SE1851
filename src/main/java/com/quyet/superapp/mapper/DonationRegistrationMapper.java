package com.quyet.superapp.mapper;

import com.quyet.superapp.dto.DonationRegistrationDTO;
import com.quyet.superapp.entity.DonationRegistration;

public class DonationRegistrationMapper {
    public static DonationRegistrationDTO toDTO(DonationRegistration reg) {
        return new DonationRegistrationDTO(
                reg.getRegistrationId(),
                reg.getUser().getUserId(),
                reg.getReadyDate(),
                reg.getStatus()
        );
    }
}