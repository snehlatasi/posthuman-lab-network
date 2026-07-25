package org.posthumanlab.network.media.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.media.entity.GalleryAlbum;
import org.posthumanlab.network.media.entity.GalleryImage;
import org.posthumanlab.network.media.entity.MediaAsset;
import org.posthumanlab.network.media.repository.GalleryAlbumRepository;
import org.posthumanlab.network.media.repository.GalleryImageRepository;
import org.posthumanlab.network.media.service.MediaStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/media")
public class AdminMediaController {

    private final MediaStorageService mediaStorageService;
    private final GalleryAlbumRepository galleryAlbumRepository;
    private final GalleryImageRepository galleryImageRepository;

    public AdminMediaController(
            MediaStorageService mediaStorageService,
            GalleryAlbumRepository galleryAlbumRepository,
            GalleryImageRepository galleryImageRepository) {
        this.mediaStorageService = mediaStorageService;
        this.galleryAlbumRepository = galleryAlbumRepository;
        this.galleryImageRepository = galleryImageRepository;
    }

    @PostMapping("/youtube")
    public ResponseEntity<MediaAsset> addYouTubeVideo(@RequestBody Map<String, String> payload) {
        String url = payload.get("url");
        String title = payload.get("title");
        String category = payload.get("category");
        String description = payload.get("description");

        MediaAsset asset = mediaStorageService.addYouTubeVideo(url, title, category, description);
        return new ResponseEntity<>(asset, HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public ResponseEntity<MediaAsset> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "altText", required = false) String altText) throws IOException {
        MediaAsset asset = mediaStorageService.uploadFile(file, title, altText);
        return new ResponseEntity<>(asset, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable("id") Long id) {
        mediaStorageService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/albums")
    public ResponseEntity<GalleryAlbum> createAlbum(@Valid @RequestBody GalleryAlbum album) {
        if (album.getSlug() == null || album.getSlug().isBlank()) {
            album.setSlug(album.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-+|-+$", ""));
        }
        GalleryAlbum created = galleryAlbumRepository.save(album);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/albums/{id}/images")
    public ResponseEntity<GalleryImage> addImageToAlbum(@PathVariable("id") Long albumId, @Valid @RequestBody GalleryImage image) {
        image.setAlbumId(albumId);
        GalleryImage saved = galleryImageRepository.save(image);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @DeleteMapping("/albums/{id}")
    public ResponseEntity<Void> deleteAlbum(@PathVariable("id") Long id) {
        galleryImageRepository.deleteByAlbumId(id);
        galleryAlbumRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
