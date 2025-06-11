package com.quyet.superapp.repository;

import com.quyet.superapp.entity.DonationRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRegistrationRepository extends JpaRepository<DonationRegistration, Integer> {
}