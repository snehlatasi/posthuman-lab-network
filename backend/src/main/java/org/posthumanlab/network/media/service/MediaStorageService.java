package org.posthumanlab.network.media.service;

import org.posthumanlab.network.media.entity.MediaAsset;
import org.posthumanlab.network.media.entity.MediaProvider;
import org.posthumanlab.network.media.entity.MediaType;
import org.posthumanlab.network.media.repository.MediaAssetRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class MediaStorageService {

    private static final String UPLOAD_DIR = "uploads";
    private static final Pattern YOUTUBE_PATTERN = Pattern.compile(
            "(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com\\/(?:watch\\?v=|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{11})"
    );

    private final MediaAssetRepository mediaAssetRepository;

    public MediaStorageService(MediaAssetRepository mediaAssetRepository) {
        this.mediaAssetRepository = mediaAssetRepository;
    }

    public static String extractYouTubeId(String url) {
        if (url == null || url.isBlank()) return null;
        Matcher matcher = YOUTUBE_PATTERN.matcher(url.trim());
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    public MediaAsset addYouTubeVideo(String youtubeUrl, String title, String category, String description) {
        String videoId = extractYouTubeId(youtubeUrl);
        if (videoId == null) {
            throw new IllegalArgumentException("Invalid YouTube URL. Please provide a valid YouTube video URL or ID.");
        }

        MediaAsset asset = new MediaAsset();
        asset.setFilename("youtube_" + videoId);
        asset.setUrl("https://www.youtube.com/embed/" + videoId);
        asset.setOriginalFilename(youtubeUrl);
        asset.setMimeType("video/youtube");
        asset.setMediaType(MediaType.VIDEO);
        asset.setProvider(MediaProvider.YOUTUBE);
        asset.setProviderVideoId(videoId);
        asset.setTitle(title != null && !title.isBlank() ? title : "YouTube Video (" + videoId + ")");
        asset.setCaption(description);
        asset.setCategory(category != null ? category : "LECTURE");

        return mediaAssetRepository.save(asset);
    }

    private static final long MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB max
    private static final List<String> ALLOWED_EXTENSIONS = List.of(".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mp3", ".wav", ".pdf");

    public MediaAsset uploadFile(MultipartFile file, String title, String altText) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file cannot be empty.");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("File size exceeds maximum allowed limit of 50MB.");
        }

        String originalName = file.getOriginalFilename();
        String extension = "";
        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf(".")).toLowerCase();
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Invalid file extension: " + extension + ". Allowed file types: " + String.join(", ", ALLOWED_EXTENSIONS));
        }

        File uploadDirFolder = new File(UPLOAD_DIR);
        if (!uploadDirFolder.exists()) {
            uploadDirFolder.mkdirs();
        }

        String uniqueFilename = UUID.randomUUID().toString() + extension;
        Path targetPath = Paths.get(UPLOAD_DIR).resolve(uniqueFilename);
        Files.copy(file.getInputStream(), targetPath);

        String mimeType = file.getContentType();
        MediaType mediaType = MediaType.IMAGE;
        if (mimeType != null && mimeType.startsWith("video/")) {
            mediaType = MediaType.VIDEO;
        } else if (mimeType != null && mimeType.startsWith("audio/")) {
            mediaType = MediaType.AUDIO;
        } else if (mimeType != null && mimeType.contains("pdf")) {
            mediaType = MediaType.DOCUMENT;
        }

        MediaAsset asset = new MediaAsset();
        asset.setFilename(uniqueFilename);
        asset.setUrl("/uploads/" + uniqueFilename);
        asset.setOriginalFilename(originalName);
        asset.setMimeType(mimeType);
        asset.setFileSizeBytes(file.getSize());
        asset.setMediaType(mediaType);
        asset.setProvider(MediaProvider.LOCAL);
        asset.setTitle(title != null && !title.isBlank() ? title : originalName);
        asset.setAltText(altText);

        return mediaAssetRepository.save(asset);
    }

    public List<MediaAsset> getAllMedia() {
        return mediaAssetRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<MediaAsset> getById(Long id) {
        return mediaAssetRepository.findById(id);
    }

    public void deleteMedia(Long id) {
        Optional<MediaAsset> assetOpt = mediaAssetRepository.findById(id);
        if (assetOpt.isPresent()) {
            MediaAsset asset = assetOpt.get();
            if (asset.getProvider() == MediaProvider.LOCAL && asset.getFilename() != null) {
                try {
                    Path filePath = Paths.get(UPLOAD_DIR).resolve(asset.getFilename());
                    Files.deleteIfExists(filePath);
                } catch (IOException ignored) {
                    // Log warning if physical file delete fails
                }
            }
            mediaAssetRepository.deleteById(id);
        }
    }
}
