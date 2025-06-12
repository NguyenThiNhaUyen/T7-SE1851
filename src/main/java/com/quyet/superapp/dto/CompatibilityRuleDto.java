package com.quyet.superapp.dto;

import lombok.Data;

@Data
public class CompatibilityRuleDto {
    private Long id;
    private Long donorTypeId;
    private Long recipientTypeId;
    private Long componentId;
    private Boolean isCompatible;
}
