package com.quyet.superapp.repository;

import com.quyet.superapp.entity.BloodInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Long> {

        List<BloodInventory> findByBloodType_Description(String description);


        // 1) Thống kê phân bố nhóm máu: description + tổng totalQuantityMl
        @Query("SELECT bi.bloodType.description, SUM(bi.totalQuantityMl) "
                + "FROM BloodInventory bi "
                + "GROUP BY bi.bloodType.description")
        List<Object[]> findGroupCounts();

        // 2) Tổng tất cả số ml trong kho
        @Query("SELECT COALESCE(SUM(bi.totalQuantityMl),0) FROM BloodInventory bi")
        long sumAllUnits();
}
