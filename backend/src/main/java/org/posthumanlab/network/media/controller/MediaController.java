package org.posthumanlab.network.media.controller;

import org.posthumanlab.network.media.entity.GalleryAlbum;
import org.posthumanlab.network.media.entity.GalleryImage;
import org.posthumanlab.network.media.entity.MediaAsset;
import org.posthumanlab.network.media.service.GalleryService;
import org.posthumanlab.network.media.service.MediaStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaStorageService mediaStorageService;
    private final GalleryService galleryService;

    public MediaController(
            MediaStorageService mediaStorageService,
            GalleryService galleryService) {
        this.mediaStorageService = mediaStorageService;
        this.galleryService = galleryService;
    }

    @GetMapping
    public ResponseEntity<List<MediaAsset>> getAllPublicMedia() {
        return ResponseEntity.ok(mediaStorageService.getPublishedMedia());
    }

    @GetMapping("/albums")
    public ResponseEntity<List<GalleryAlbum>> getGalleryAlbums() {
        return ResponseEntity.ok(galleryService.getAlbums());
    }

    @GetMapping("/albums/{id}/images")
    public ResponseEntity<List<GalleryImage>> getAlbumImages(@PathVariable("id") Long id) {
        return ResponseEntity.ok(galleryService.getAlbumImages(id));
    }
}
