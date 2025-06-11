package com.quyet.superapp.controller;

import com.quyet.superapp.service.TransfusionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfusions")
@RequiredArgsConstructor
public class TransfusionController {

    private final TransfusionService transfusionService;

    @PostMapping
    public TransfusionConfirm confirmTransfusion(@Valid @RequestBody TransfusionConfirm confirm) {
        return transfusionService.confirmTransfusion(confirm);
    }

    @GetMapping("/user/{recipientName}")
    public List<TransfusionConfirm> getTransfusionsByUser(@PathVariable String recipientName) {
        return transfusionService.getTransfusionsByUser(recipientName);
    }

    @GetMapping
    public List<TransfusionConfirm> getAllTransfusions() {
        return transfusionService.getAllTransfusions();
    }
}
