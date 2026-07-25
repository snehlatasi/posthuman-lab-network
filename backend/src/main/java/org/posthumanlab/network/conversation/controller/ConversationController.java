package org.posthumanlab.network.conversation.controller;

import org.posthumanlab.network.conversation.entity.Conversation;
import org.posthumanlab.network.conversation.repository.ConversationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationRepository conversationRepository;

    public ConversationController(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    @GetMapping
    public ResponseEntity<List<Conversation>> getFeaturedConversations() {
        return ResponseEntity.ok(conversationRepository.findByFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Conversation>> getAllConversations() {
        return ResponseEntity.ok(conversationRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc());
    }
}
