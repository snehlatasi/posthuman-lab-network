package org.posthumanlab.network.contact.dto;

import org.posthumanlab.network.contact.entity.ContactMessage;
import org.posthumanlab.network.contact.entity.ContactMessageStatus;

import java.time.LocalDateTime;

public class ContactResponse {
    private Long id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private ContactMessageStatus status;
    private LocalDateTime createdAt;

    public ContactResponse() {}

    public ContactResponse(ContactMessage msg) {
        this.id = msg.getId();
        this.name = msg.getName();
        this.email = msg.getEmail();
        this.subject = msg.getSubject();
        this.message = msg.getMessage();
        this.status = msg.getStatus();
        this.createdAt = msg.getCreatedAt();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ContactMessageStatus getStatus() {
        return status;
    }

    public void setStatus(ContactMessageStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
