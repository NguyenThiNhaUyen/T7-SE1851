    package com.quyet.superapp.controller;

    import com.quyet.superapp.entity.ContactForm;
    import com.quyet.superapp.service.ContactFormService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;
    @RestController
    @RequestMapping("/api/contact-forms")
    @RequiredArgsConstructor
    public class ContactFormController {

        private final ContactFormService service;

        @GetMapping
        public List<ContactForm> getAll() {
            return service.getAll();
        }

        @GetMapping("/{id}")
        public ResponseEntity<ContactForm> getById(@PathVariable Integer id) {
            return service.getById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        @PostMapping
        public ContactForm create(@RequestBody ContactForm form) {
            return service.create(form);
        }

        @DeleteMapping("/{id}")
        public void delete(@PathVariable Integer id) {
            service.delete(id);
        }
    }
