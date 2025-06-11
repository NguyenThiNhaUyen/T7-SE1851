package com.quyet.superapp.controller;


import com.quyet.superapp.repository.TransfusionConfirmRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TransfusionControllerIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TransfusionConfirmRepository repository;

    @Test
    void testConfirmTransfusion_withRealDatabase() throws Exception {
        TransfusionConfirm confirm = new TransfusionConfirm(null, "Lê Thị B", "A+", 1, null, null);

        mockMvc.perform(post("/api/transfusions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(confirm)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.recipientName").value("Lê Thị B"));
    }

    @Test
    void testGetAllTransfusions_withRealDatabase() throws Exception {
        repository.save(new TransfusionConfirm(null, "Test User", "B-", 2, LocalDateTime.now(), "confirmed"));

        mockMvc.perform(get("/api/transfusions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].recipientName").value("Test User"));
    }
}

