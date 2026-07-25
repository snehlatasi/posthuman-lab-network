package org.posthumanlab.network.curation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "homepage_curations")
public class HomepageCuration {

    @Id
    private Long id = 1L; // Single-row singleton entity

    private Long featuredMasterclassId;
    private Long featuredPublicationId;
    private Long featuredLabId;
    private Long featuredVideoId;
    private Long featuredConversationId;

    private String announcementTitle;

    @Column(columnDefinition = "TEXT")
    private String announcementMessage;

    private String announcementLink;
    private boolean announcementActive = false;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public HomepageCuration() {}

    @PrePersist
    @PreUpdate
    protected void onSave() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFeaturedMasterclassId() { return featuredMasterclassId; }
    public void setFeaturedMasterclassId(Long featuredMasterclassId) { this.featuredMasterclassId = featuredMasterclassId; }

    public Long getFeaturedPublicationId() { return featuredPublicationId; }
    public void setFeaturedPublicationId(Long featuredPublicationId) { this.featuredPublicationId = featuredPublicationId; }

    public Long getFeaturedLabId() { return featuredLabId; }
    public void setFeaturedLabId(Long featuredLabId) { this.featuredLabId = featuredLabId; }

    public Long getFeaturedVideoId() { return featuredVideoId; }
    public void setFeaturedVideoId(Long featuredVideoId) { this.featuredVideoId = featuredVideoId; }

    public Long getFeaturedConversationId() { return featuredConversationId; }
    public void setFeaturedConversationId(Long featuredConversationId) { this.featuredConversationId = featuredConversationId; }

    public String getAnnouncementTitle() { return announcementTitle; }
    public void setAnnouncementTitle(String announcementTitle) { this.announcementTitle = announcementTitle; }

    public String getAnnouncementMessage() { return announcementMessage; }
    public void setAnnouncementMessage(String announcementMessage) { this.announcementMessage = announcementMessage; }

    public String getAnnouncementLink() { return announcementLink; }
    public void setAnnouncementLink(String announcementLink) { this.announcementLink = announcementLink; }

    public boolean isAnnouncementActive() { return announcementActive; }
    public void setAnnouncementActive(boolean announcementActive) { this.announcementActive = announcementActive; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
