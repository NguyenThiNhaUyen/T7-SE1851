package com.quyet.superapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;

    public List<Report> getAll() {
        return reportRepository.findAll();
    }

    public Report save(Report report) {
        return reportRepository.save(report);
    }
}
