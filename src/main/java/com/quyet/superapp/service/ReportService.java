package com.quyet.superapp.service;

import com.quyet.superapp.entity.Report;
import com.quyet.superapp.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    public List<Report> getAll() {
        return reportRepository.findAll();
    }

    public Optional<Report> getById(Integer id) {
        return reportRepository.findById(id);
    }

    public Report save(Report report) {
        return reportRepository.save(report);
    }

    public void deleteById(Integer id) {
        reportRepository.deleteById(id);
    }
}
