package com.quyet.superapp.service;

import com.quyet.superapp.entity.ContactForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactFormService {
    private final ContactFormRepository contactFormRepository;

    public List<ContactForm> getAll() {
        return contactFormRepository.findAll();
    }

    public ContactForm save(ContactForm contactForm) {
        return contactFormRepository.save(contactForm);
    }

    public void delete(Integer id) {
        contactFormRepository.deleteById(id);
    }
}
