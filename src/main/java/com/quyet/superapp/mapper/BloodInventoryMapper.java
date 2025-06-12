package com.quyet.superapp.mapper;

import com.quyet.superapp.dto.BloodInventoryDTO;
import com.quyet.superapp.entity.BloodInventory;

public class BloodInventoryMapper {

    public static BloodInventoryDTO toDTO(BloodInventory inventory) {
        return new BloodInventoryDTO(
                inventory.getBloodInventoryId(),
                inventory.getBloodType().getBloodTypeId(),
                inventory.getComponent().getBloodComponentId(),
                inventory.getTotalQuantityMl(),
                inventory.getLastUpdated()
        );
    }
}
