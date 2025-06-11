package com.quyet.superapp.controller;


import com.quyet.superapp.entity.VnPayment;
import com.quyet.superapp.service.VnPayPaymentService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vnpay")
@RequiredArgsConstructor
public class VnPayMentController {


    private final VnPayPaymentService service;

    @GetMapping
    public List<VnPayment> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VnPayment> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public VnPayment create(@RequestBody VnPayment payment) {
        return service.save(payment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}
