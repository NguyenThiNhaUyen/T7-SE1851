package com.quyet.superapp.repository;

import com.quyet.superapp.entity.BloodInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Long> {
        List<BloodInventory> indByBloodType_Description(String description);
}