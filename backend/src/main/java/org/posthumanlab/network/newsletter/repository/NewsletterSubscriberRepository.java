package org.posthumanlab.network.newsletter.repository;

import org.posthumanlab.network.newsletter.entity.NewsletterSubscriber;
import org.posthumanlab.network.newsletter.entity.NewsletterSubscriberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, Long> {
    Optional<NewsletterSubscriber> findByEmailIgnoreCase(String email);
    Optional<NewsletterSubscriber> findByUnsubscribeToken(String unsubscribeToken);
    List<NewsletterSubscriber> findAllByOrderByCreatedAtDesc();
    long countByStatus(NewsletterSubscriberStatus status);
}
