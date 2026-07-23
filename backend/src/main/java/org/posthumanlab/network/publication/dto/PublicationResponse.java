package org.posthumanlab.network.publication.dto;

import org.posthumanlab.network.publication.entity.Publication;
import org.posthumanlab.network.publication.entity.PublicationStatus;
import org.posthumanlab.network.publication.entity.PublicationType;

import java.time.LocalDateTime;

public class PublicationResponse {
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String content;
    private String authorDisplayName;
    private PublicationType publicationType;
    private LocalDateTime publishedAt;
    private PublicationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PublicationResponse() {}

    public PublicationResponse(Publication pub) {
        this.id = pub.getId();
        this.title = pub.getTitle();
        this.slug = pub.getSlug();
        this.summary = pub.getSummary();
        this.content = pub.getContent();
        this.authorDisplayName = pub.getAuthorDisplayName();
        this.publicationType = pub.getPublicationType();
        this.publishedAt = pub.getPublishedAt();
        this.status = pub.getStatus();
        this.createdAt = pub.getCreatedAt();
        this.updatedAt = pub.getUpdatedAt();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorDisplayName() {
        return authorDisplayName;
    }

    public void setAuthorDisplayName(String authorDisplayName) {
        this.authorDisplayName = authorDisplayName;
    }

    public PublicationType getPublicationType() {
        return publicationType;
    }

    public void setPublicationType(PublicationType publicationType) {
        this.publicationType = publicationType;
    }

    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }

    public PublicationStatus getStatus() {
        return status;
    }

    public void setStatus(PublicationStatus status) {
        this.status = status;
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
}
