package org.posthumanlab.network.conversation.repository;

import org.posthumanlab.network.conversation.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findBySlug(String slug);
    List<Conversation> findByFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc();
    List<Conversation> findAllByOrderByDisplayOrderAscCreatedAtDesc();
}
