package org.posthumanlab.network.newsletter.service;

import org.posthumanlab.network.common.exception.ResourceNotFoundException;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscribeRequest;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscriberResponse;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscriptionResponse;
import org.posthumanlab.network.newsletter.entity.NewsletterSubscriber;
import org.posthumanlab.network.newsletter.entity.NewsletterSubscriberStatus;
import org.posthumanlab.network.newsletter.repository.NewsletterSubscriberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class NewsletterSubscriptionService {

    private final NewsletterSubscriberRepository subscriberRepository;

    public NewsletterSubscriptionService(NewsletterSubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    public NewsletterSubscriptionResponse subscribe(NewsletterSubscribeRequest request) {
        String normalizedEmail = normalizeEmail(request.getEmail());
        NewsletterSubscriber subscriber = subscriberRepository
                .findByEmailIgnoreCase(normalizedEmail)
                .orElseGet(NewsletterSubscriber::new);

        boolean isNewSubscriber = subscriber.getId() == null;
        LocalDateTime now = LocalDateTime.now();

        subscriber.setName(request.getName().trim());
        subscriber.setEmail(normalizedEmail);
        subscriber.setInterests(normalizeOptional(request.getInterests(), "all-updates"));
        subscriber.setTermsAccepted(true);
        subscriber.setSource(normalizeOptional(request.getSource(), "footer"));
        subscriber.setStatus(NewsletterSubscriberStatus.ACTIVE);
        subscriber.setSubscribedAt(now);
        subscriber.setUnsubscribedAt(null);

        if (subscriber.getUnsubscribeToken() == null || subscriber.getUnsubscribeToken().isBlank()) {
            subscriber.setUnsubscribeToken(generateUnsubscribeToken());
        }

        NewsletterSubscriber saved = subscriberRepository.save(subscriber);
        String message = isNewSubscriber
                ? "Subscribed for network updates."
                : "Subscription updated. You are on the network updates list.";
        return new NewsletterSubscriptionResponse(saved, message);
    }

    public NewsletterSubscriptionResponse unsubscribe(String token) {
        NewsletterSubscriber subscriber = subscriberRepository.findByUnsubscribeToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Newsletter subscription not found."));

        subscriber.setStatus(NewsletterSubscriberStatus.UNSUBSCRIBED);
        subscriber.setUnsubscribedAt(LocalDateTime.now());

        NewsletterSubscriber saved = subscriberRepository.save(subscriber);
        return new NewsletterSubscriptionResponse(saved, "You have been unsubscribed from network updates.");
    }

    @Transactional(readOnly = true)
    public List<NewsletterSubscriberResponse> getAllSubscribers() {
        return subscriberRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(NewsletterSubscriberResponse::new)
                .toList();
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    private String normalizeOptional(String value, String fallback) {
        if (value == null || value.isBlank()) {
            return fallback;
        }
        return value.trim();
    }

    private String generateUnsubscribeToken() {
        return UUID.randomUUID().toString().replace("-", "") + UUID.randomUUID().toString().replace("-", "");
    }
}
