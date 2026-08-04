package org.posthumanlab.network.conversation.service;

import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.conversation.entity.Conversation;
import org.posthumanlab.network.conversation.repository.ConversationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    public List<Conversation> getAll() {
        return conversationRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc();
    }

    public List<Conversation> getFeatured() {
        return conversationRepository.findByFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc();
    }

    public Conversation create(Conversation conversation) {
        normalizeSlug(conversation);
        return conversationRepository.save(conversation);
    }

    public Optional<Conversation> update(Long id, Conversation request) {
        return conversationRepository.findById(id).map(existing -> {
            existing.setTitle(request.getTitle());
            existing.setSlug(SlugUtils.resolve(request.getSlug(), request.getTitle()));
            existing.setCategory(request.getCategory());
            existing.setShortDescription(request.getShortDescription());
            existing.setLongDescription(request.getLongDescription());
            existing.setDisplayNumber(request.getDisplayNumber());
            existing.setDisplayOrder(request.getDisplayOrder());
            existing.setFeatured(request.isFeatured());
            return conversationRepository.save(existing);
        });
    }

    public void delete(Long id) {
        conversationRepository.deleteById(id);
    }

    private void normalizeSlug(Conversation conversation) {
        conversation.setSlug(SlugUtils.resolve(conversation.getSlug(), conversation.getTitle()));
    }
}
