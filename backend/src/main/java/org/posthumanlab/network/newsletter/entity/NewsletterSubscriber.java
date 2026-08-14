package org.posthumanlab.network.newsletter.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "newsletter_subscribers",
    indexes = {
        @Index(name = "idx_newsletter_subscribers_email", columnList = "email", unique = true),
        @Index(name = "idx_newsletter_subscribers_status", columnList = "status"),
        @Index(name = "idx_newsletter_subscribers_unsubscribe_token", columnList = "unsubscribe_token", unique = true)
    }
)
public class NewsletterSubscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, unique = true, length = 180)
    private String email;

    @Column(length = 120)
    private String interests;

    @Column(nullable = false)
    private Boolean termsAccepted;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24)
    private NewsletterSubscriberStatus status;

    @Column(name = "unsubscribe_token", nullable = false, unique = true, length = 80)
    private String unsubscribeToken;

    @Column(nullable = false, length = 80)
    private String source;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "subscribed_at", nullable = false)
    private LocalDateTime subscribedAt;

    @Column(name = "unsubscribed_at")
    private LocalDateTime unsubscribedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.subscribedAt == null) {
            this.subscribedAt = now;
        }
        if (this.status == null) {
            this.status = NewsletterSubscriberStatus.ACTIVE;
        }
        if (this.source == null || this.source.isBlank()) {
            this.source = "footer";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public Boolean getTermsAccepted() {
        return termsAccepted;
    }

    public void setTermsAccepted(Boolean termsAccepted) {
        this.termsAccepted = termsAccepted;
    }

    public NewsletterSubscriberStatus getStatus() {
        return status;
    }

    public void setStatus(NewsletterSubscriberStatus status) {
        this.status = status;
    }

    public String getUnsubscribeToken() {
        return unsubscribeToken;
    }

    public void setUnsubscribeToken(String unsubscribeToken) {
        this.unsubscribeToken = unsubscribeToken;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getSubscribedAt() {
        return subscribedAt;
    }

    public void setSubscribedAt(LocalDateTime subscribedAt) {
        this.subscribedAt = subscribedAt;
    }

    public LocalDateTime getUnsubscribedAt() {
        return unsubscribedAt;
    }

    public void setUnsubscribedAt(LocalDateTime unsubscribedAt) {
        this.unsubscribedAt = unsubscribedAt;
    }
}
