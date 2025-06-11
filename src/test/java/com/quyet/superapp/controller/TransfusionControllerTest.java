package com.quyet.superapp.controller;

import com.quyet.superapp.SeminarApplication;

import com.quyet.superapp.service.TransfusionService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ContextConfiguration(classes = SeminarApplication.class)  // ✅ dòng fix
@WebMvcTest(controllers = TransfusionController.class)
@Import(com.quyet.superapp.exception.GlobalExceptionHandler.class)
class TransfusionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransfusionService transfusionService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllTransfusions() throws Exception {
        when(transfusionService.getAllTransfusions()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/transfusions"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void testConfirmTransfusion_ValidationError() throws Exception {
        TransfusionConfirm invalid = new TransfusionConfirm();
        invalid.setUnits(0); // not valid

        mockMvc.perform(post("/api/transfusions")
                        .contentType(String.valueOf(MediaType.APPLICATION_JSON))
                        .content(objectMapper.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest());
    }
}
