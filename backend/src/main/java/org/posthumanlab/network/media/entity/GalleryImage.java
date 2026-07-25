package org.posthumanlab.network.media.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "gallery_images")
public class GalleryImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long albumId;

    @Column(nullable = false, length = 1000)
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String altText;

    @Column(columnDefinition = "TEXT")
    private String caption;

    private String credit;
    private int displayOrder = 0;

    public GalleryImage() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getAlbumId() { return albumId; }
    public void setAlbumId(Long albumId) { this.albumId = albumId; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getAltText() { return altText; }
    public void setAltText(String altText) { this.altText = altText; }

    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }

    public String getCredit() { return credit; }
    public void setCredit(String credit) { this.credit = credit; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
