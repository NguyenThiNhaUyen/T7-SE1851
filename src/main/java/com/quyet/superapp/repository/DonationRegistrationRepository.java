package com.quyet.superapp.repository;

import com.quyet.superapp.entity.DonationRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRegistrationRepository extends JpaRepository<DonationRegistration, Long> {
}