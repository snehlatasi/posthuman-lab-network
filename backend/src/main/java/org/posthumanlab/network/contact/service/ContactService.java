package org.posthumanlab.network.contact.service;

import org.posthumanlab.network.contact.dto.ContactRequest;
import org.posthumanlab.network.contact.dto.ContactResponse;
import org.posthumanlab.network.contact.entity.ContactMessage;
import org.posthumanlab.network.contact.entity.ContactMessageStatus;
import org.posthumanlab.network.contact.repository.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactResponse saveMessage(ContactRequest request) {
        ContactMessage msg = new ContactMessage();
        msg.setName(request.getName());
        msg.setEmail(request.getEmail());
        msg.setSubject(request.getSubject());
        msg.setMessage(request.getMessage());
        msg.setStatus(ContactMessageStatus.NEW);

        ContactMessage saved = contactRepository.save(msg);
        return new ContactResponse(saved);
    }

    @Transactional(readOnly = true)
    public java.util.List<ContactResponse> getAllMessages() {
        return contactRepository.findAll().stream()
                .map(ContactResponse::new)
                .collect(java.util.stream.Collectors.toList());
    }

    public void deleteMessage(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new org.posthumanlab.network.common.exception.ResourceNotFoundException("Contact message not found with ID: " + id);
        }
        contactRepository.deleteById(id);
    }
}
