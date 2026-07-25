package org.posthumanlab.network.person.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "network_people")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    private String role;
    private String affiliation;

    @Column(columnDefinition = "TEXT")
    private String shortBio;

    @Column(columnDefinition = "TEXT")
    private String fullBio;

    private String portraitUrl;
    private String website;
    private String orcid;
    private boolean featured = false;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Person() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAffiliation() { return affiliation; }
    public void setAffiliation(String affiliation) { this.affiliation = affiliation; }

    public String getShortBio() { return shortBio; }
    public void setShortBio(String shortBio) { this.shortBio = shortBio; }

    public String getFullBio() { return fullBio; }
    public void setFullBio(String fullBio) { this.fullBio = fullBio; }

    public String getPortraitUrl() { return portraitUrl; }
    public void setPortraitUrl(String portraitUrl) { this.portraitUrl = portraitUrl; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getOrcid() { return orcid; }
    public void setOrcid(String orcid) { this.orcid = orcid; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
