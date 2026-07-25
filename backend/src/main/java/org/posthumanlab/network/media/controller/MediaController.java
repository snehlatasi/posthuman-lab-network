package org.posthumanlab.network.media.controller;

import org.posthumanlab.network.media.entity.GalleryAlbum;
import org.posthumanlab.network.media.entity.GalleryImage;
import org.posthumanlab.network.media.entity.MediaAsset;
import org.posthumanlab.network.media.repository.GalleryAlbumRepository;
import org.posthumanlab.network.media.repository.GalleryImageRepository;
import org.posthumanlab.network.media.service.MediaStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaStorageService mediaStorageService;
    private final GalleryAlbumRepository galleryAlbumRepository;
    private final GalleryImageRepository galleryImageRepository;

    public MediaController(
            MediaStorageService mediaStorageService,
            GalleryAlbumRepository galleryAlbumRepository,
            GalleryImageRepository galleryImageRepository) {
        this.mediaStorageService = mediaStorageService;
        this.galleryAlbumRepository = galleryAlbumRepository;
        this.galleryImageRepository = galleryImageRepository;
    }

    @GetMapping
    public ResponseEntity<List<MediaAsset>> getAllPublicMedia() {
        return ResponseEntity.ok(mediaStorageService.getAllMedia());
    }

    @GetMapping("/albums")
    public ResponseEntity<List<GalleryAlbum>> getGalleryAlbums() {
        return ResponseEntity.ok(galleryAlbumRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc());
    }

    @GetMapping("/albums/{id}/images")
    public ResponseEntity<List<GalleryImage>> getAlbumImages(@PathVariable("id") Long id) {
        return ResponseEntity.ok(galleryImageRepository.findByAlbumIdOrderByDisplayOrderAsc(id));
    }
}
