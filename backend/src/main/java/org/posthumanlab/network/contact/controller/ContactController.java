package org.posthumanlab.network.contact.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.contact.dto.ContactRequest;
import org.posthumanlab.network.contact.dto.ContactResponse;
import org.posthumanlab.network.contact.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<ContactResponse>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable("id") Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}

