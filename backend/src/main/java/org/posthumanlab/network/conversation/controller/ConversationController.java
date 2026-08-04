package org.posthumanlab.network.conversation.controller;

import org.posthumanlab.network.conversation.entity.Conversation;
import org.posthumanlab.network.conversation.service.ConversationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping
    public ResponseEntity<List<Conversation>> getFeaturedConversations() {
        return ResponseEntity.ok(conversationService.getFeatured());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Conversation>> getAllConversations() {
        return ResponseEntity.ok(conversationService.getAll());
    }
}
