package com.quyet.superapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScanLogService {
    private final ScanLogRepository scanLogRepository;

    public List<ScanLog> getAll() {
        return scanLogRepository.findAll();
    }

    public ScanLog save(ScanLog scanLog) {
        return scanLogRepository.save(scanLog);
    }
}