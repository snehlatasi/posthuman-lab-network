package org.posthumanlab.network.media.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "app.media.storage")
public class MediaStorageProperties {

    private String uploadDir = "uploads";
    private long maxFileSizeBytes = 50 * 1024 * 1024;
    private List<String> allowedExtensions = List.of(
            ".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mp3", ".wav", ".pdf"
    );

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

    public long getMaxFileSizeBytes() {
        return maxFileSizeBytes;
    }

    public void setMaxFileSizeBytes(long maxFileSizeBytes) {
        this.maxFileSizeBytes = maxFileSizeBytes;
    }

    public List<String> getAllowedExtensions() {
        return allowedExtensions;
    }

    public void setAllowedExtensions(List<String> allowedExtensions) {
        this.allowedExtensions = allowedExtensions;
    }
}
