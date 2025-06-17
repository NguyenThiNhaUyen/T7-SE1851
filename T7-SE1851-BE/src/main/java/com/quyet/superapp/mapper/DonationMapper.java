package com.quyet.superapp.mapper;

import com.quyet.superapp.dto.DonationDTO;
import com.quyet.superapp.entity.Donation;

public class DonationMapper {
    public static DonationDTO toDTO(Donation donation) {
        return new DonationDTO(
                donation.getDonationId(),
                donation.getUser().getUserId(),
                donation.getRegistration().getRegistrationId(),
                donation.getBloodType().getBloodTypeId(),
                donation.getComponent().getBloodComponentId(),
                donation.getDonationDate(),
                donation.getVolumeMl(),
                donation.getLocation(),
                donation.getNotes()
        );
    }
}