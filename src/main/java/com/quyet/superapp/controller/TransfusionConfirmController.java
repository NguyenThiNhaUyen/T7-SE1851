package com.quyet.superapp.controller;

import com.quyet.superapp.entity.TransfusionConfirm;
import com.quyet.superapp.service.TransfusionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfusions")
@RequiredArgsConstructor
public class TransfusionConfirmController {

    private final TransfusionService transfusionService;

    @PostMapping("/confirm")
    public ResponseEntity<TransfusionConfirm> confirmTransfusion(@RequestBody TransfusionConfirm confirm) {
        return ResponseEntity.ok(transfusionService.confirmTransfusion(confirm));
    }

    @GetMapping
    public ResponseEntity<List<TransfusionConfirm>> getAllTransfusions() {
        return ResponseEntity.ok(transfusionService.getAllTransfusions());
    }

    @GetMapping("/user/{recipientName}")
    public ResponseEntity<List<TransfusionConfirm>> getByRecipient(@PathVariable String recipientName) {
        return ResponseEntity.ok(transfusionService.getTransfusionsByUser(recipientName));
    }
}
