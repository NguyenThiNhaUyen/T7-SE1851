package com.quyet.superapp.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TransfusionServiceTest {

    @Mock
    private TransfusionConfirmRepository transfusionRepo;

    @InjectMocks
    private TransfusionService transfusionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testConfirmTransfusion() {
        TransfusionConfirm confirm = new TransfusionConfirm();
        confirm.setRecipientName("Nguyen Van A");
        confirm.setBloodType("O+");
        confirm.setUnits(2);

        when(transfusionRepo.save(any())).thenAnswer(invocation -> {
            TransfusionConfirm input = invocation.getArgument(0);
            input.setConfirmedAt(LocalDateTime.now());
            input.setStatus("confirmed");
            return input;
        });

        TransfusionConfirm saved = transfusionService.confirmTransfusion(confirm);

        assertNotNull(saved.getConfirmedAt());
        assertEquals("confirmed", saved.getStatus());
        verify(transfusionRepo, times(1)).save(confirm);
    }

    @Test
    void testGetAllTransfusions() {
        when(transfusionRepo.findAll()).thenReturn(Collections.emptyList());
        List<TransfusionConfirm> list = transfusionService.getAllTransfusions();
        assertEquals(0, list.size());
    }
}
