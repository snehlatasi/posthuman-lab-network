package org.posthumanlab.network.conversation.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.conversation.entity.Conversation;
import org.posthumanlab.network.conversation.service.ConversationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/conversations")
public class AdminConversationController {

    private final ConversationService conversationService;

    public AdminConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping
    public ResponseEntity<List<Conversation>> getAllConversationsAdmin() {
        return ResponseEntity.ok(conversationService.getAll());
    }

    @PostMapping
    public ResponseEntity<Conversation> createConversation(@Valid @RequestBody Conversation conversation) {
        Conversation saved = conversationService.create(conversation);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Conversation> updateConversation(@PathVariable("id") Long id, @Valid @RequestBody Conversation conversation) {
        return conversationService.update(id, conversation)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConversation(@PathVariable("id") Long id) {
        conversationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
