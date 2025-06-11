package com.quyet.superapp.controller;

import com.quyet.superapp.entity.VnPayPayment;
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
    public List<VnPayPayment> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VnPayPayment> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public VnPayPayment create(@RequestBody VnPayPayment payment) {
        return service.save(payment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }
}
