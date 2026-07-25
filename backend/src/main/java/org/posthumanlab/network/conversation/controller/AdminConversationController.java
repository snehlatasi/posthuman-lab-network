package org.posthumanlab.network.conversation.controller;

import org.posthumanlab.network.conversation.entity.Conversation;
import org.posthumanlab.network.conversation.repository.ConversationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/conversations")
public class AdminConversationController {

    private final ConversationRepository conversationRepository;

    public AdminConversationController(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    @GetMapping
    public ResponseEntity<List<Conversation>> getAllConversationsAdmin() {
        return ResponseEntity.ok(conversationRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<Conversation> createConversation(@RequestBody Conversation conversation) {
        if (conversation.getSlug() == null || conversation.getSlug().isBlank()) {
            conversation.setSlug(conversation.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-+|-+$", ""));
        }
        Conversation saved = conversationRepository.save(conversation);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Conversation> updateConversation(@PathVariable("id") Long id, @RequestBody Conversation conversation) {
        conversation.setId(id);
        Conversation updated = conversationRepository.save(conversation);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConversation(@PathVariable("id") Long id) {
        conversationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
