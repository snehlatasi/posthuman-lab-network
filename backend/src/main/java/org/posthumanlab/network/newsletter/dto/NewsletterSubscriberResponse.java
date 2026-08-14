package org.posthumanlab.network.newsletter.dto;

import org.posthumanlab.network.newsletter.entity.NewsletterSubscriber;
import org.posthumanlab.network.newsletter.entity.NewsletterSubscriberStatus;

import java.time.LocalDateTime;

public class NewsletterSubscriberResponse {
    private Long id;
    private String name;
    private String email;
    private String interests;
    private NewsletterSubscriberStatus status;
    private String source;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime subscribedAt;
    private LocalDateTime unsubscribedAt;

    public NewsletterSubscriberResponse() {}

    public NewsletterSubscriberResponse(NewsletterSubscriber subscriber) {
        this.id = subscriber.getId();
        this.name = subscriber.getName();
        this.email = subscriber.getEmail();
        this.interests = subscriber.getInterests();
        this.status = subscriber.getStatus();
        this.source = subscriber.getSource();
        this.createdAt = subscriber.getCreatedAt();
        this.updatedAt = subscriber.getUpdatedAt();
        this.subscribedAt = subscriber.getSubscribedAt();
        this.unsubscribedAt = subscriber.getUnsubscribedAt();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getInterests() {
        return interests;
    }

    public NewsletterSubscriberStatus getStatus() {
        return status;
    }

    public String getSource() {
        return source;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getSubscribedAt() {
        return subscribedAt;
    }

    public LocalDateTime getUnsubscribedAt() {
        return unsubscribedAt;
    }
}
