package org.posthumanlab.network.contact.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.contact.dto.ContactRequest;
import org.posthumanlab.network.contact.dto.ContactResponse;
import org.posthumanlab.network.contact.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> createMessage(@Valid @RequestBody ContactRequest request) {
        ContactResponse response = contactService.saveMessage(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
