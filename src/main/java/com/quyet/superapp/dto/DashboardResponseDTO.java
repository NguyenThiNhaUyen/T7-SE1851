package com.quyet.superapp.dto;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponseDTO {
    private long donorsToday;
    private long totalUnits;
    private long urgentRequests;
    private List<GroupStat> bloodGroupStats;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GroupStat {
        private String bloodGroup;
        private long count;
    }
}
