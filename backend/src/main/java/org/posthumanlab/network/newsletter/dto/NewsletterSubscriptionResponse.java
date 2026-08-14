package org.posthumanlab.network.newsletter.dto;

import org.posthumanlab.network.newsletter.entity.NewsletterSubscriber;
import org.posthumanlab.network.newsletter.entity.NewsletterSubscriberStatus;

public class NewsletterSubscriptionResponse {
    private Long id;
    private String email;
    private NewsletterSubscriberStatus status;
    private String message;

    public NewsletterSubscriptionResponse() {}

    public NewsletterSubscriptionResponse(NewsletterSubscriber subscriber, String message) {
        this.id = subscriber.getId();
        this.email = subscriber.getEmail();
        this.status = subscriber.getStatus();
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public NewsletterSubscriberStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
