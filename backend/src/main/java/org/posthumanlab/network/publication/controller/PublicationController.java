package org.posthumanlab.network.publication.controller;

import org.posthumanlab.network.publication.dto.PublicationResponse;
import org.posthumanlab.network.publication.entity.PublicationType;
import org.posthumanlab.network.publication.service.PublicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
public class PublicationController {

    private final PublicationService publicationService;

    public PublicationController(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    @GetMapping
    public ResponseEntity<List<PublicationResponse>> getPublishedPublications(
            @RequestParam(required = false) PublicationType type) {
        return ResponseEntity.ok(publicationService.getPublishedPublications(type));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<PublicationResponse>> getAllAdminPublications() {
        return ResponseEntity.ok(publicationService.getAllPublications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicationResponse> getPublicationById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(publicationService.getPublicationById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<PublicationResponse> getPublicationBySlug(@PathVariable("slug") String slug) {
        return ResponseEntity.ok(publicationService.getPublicationBySlug(slug));
    }

    @PostMapping
    public ResponseEntity<PublicationResponse> createPublication(@jakarta.validation.Valid @org.springframework.web.bind.annotation.RequestBody org.posthumanlab.network.publication.dto.PublicationRequest request) {
        PublicationResponse created = publicationService.createPublication(request);
        return new ResponseEntity<>(created, org.springframework.http.HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PublicationResponse> updatePublication(@PathVariable("id") Long id, @jakarta.validation.Valid @org.springframework.web.bind.annotation.RequestBody org.posthumanlab.network.publication.dto.PublicationRequest request) {
        return ResponseEntity.ok(publicationService.updatePublication(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable("id") Long id) {
        publicationService.deletePublication(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/publish")
    public ResponseEntity<PublicationResponse> publishPublication(@PathVariable("id") Long id) {
        return ResponseEntity.ok(publicationService.setPublishStatus(id, true));
    }

    @PutMapping("/{id}/unpublish")
    public ResponseEntity<PublicationResponse> unpublishPublication(@PathVariable("id") Long id) {
        return ResponseEntity.ok(publicationService.setPublishStatus(id, false));
    }
}
