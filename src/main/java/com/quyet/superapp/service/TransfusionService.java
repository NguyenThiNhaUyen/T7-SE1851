package com.quyet.superapp.service;

import com.quyet.superapp.repository.TransfusionConfirmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransfusionService {

    private final TransfusionConfirmRepository transfutionRepo;

    public TransfusionConfirm confirmTransfusion(TransfusionConfirm confirm){
        confirm.setConfirmedAt(LocalDateTime.now());
        confirm.setStatus("confirmed");
        return transfutionRepo.save(confirm);
    }

    public List<TransfusionConfirm> getAllTransfusions(){
        return transfutionRepo.findAll();
    }

    public List<TransfusionConfirm> getTransfusionsByUser(String recipientName) {
        return transfutionRepo.findByRecipientName(recipientName);
    }

}
