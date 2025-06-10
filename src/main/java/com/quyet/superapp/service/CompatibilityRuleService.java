package com.quyet.superapp.service;

import com.quyet.superapp.entity.CompatibilityRule;
import com.quyet.superapp.repository.CompatibilityRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompatibilityRuleService {

    @Autowired
    private CompatibilityRuleRepository repository;

    public List<CompatibilityRule> getAllRules() {
        return repository.findAll();
    }

    public List<CompatibilityRule> getCompatibleRules(String recipientType, String component) {
        return repository.findByRecipientTypeAndComponentAndIsCompatibleTrue(recipientType, component);
    }

    public CompatibilityRule addRule(CompatibilityRule rule) {
        return repository.save(rule);
    }

    public void deleteRule(Long id) {
        repository.deleteById(id);
    }

    public CompatibilityRule updateRule(Long id, CompatibilityRule updatedRule) {
        CompatibilityRule rule = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy rule"));

        rule.setComponent(updatedRule.getComponent());
        rule.setDonorType(updatedRule.getDonorType());
        rule.setRecipientType(updatedRule.getRecipientType());
        rule.setCompatible(updatedRule.isCompatible());

        return repository.save(rule);
    }
}
