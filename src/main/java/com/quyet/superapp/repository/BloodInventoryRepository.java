package com.quyet.superapp.repository;

import com.quyet.superapp.entity.BloodInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Long> {
    List<BloodInventory> findByBloodType(String bloodType);
}