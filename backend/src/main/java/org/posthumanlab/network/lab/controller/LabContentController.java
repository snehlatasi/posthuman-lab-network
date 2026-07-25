package org.posthumanlab.network.lab.controller;

import org.posthumanlab.network.lab.entity.LabContent;
import org.posthumanlab.network.lab.repository.LabContentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labs")
public class LabContentController {

    private final LabContentRepository labContentRepository;

    public LabContentController(LabContentRepository labContentRepository) {
        this.labContentRepository = labContentRepository;
    }

    @GetMapping
    public ResponseEntity<List<LabContent>> getAllLabs() {
        return ResponseEntity.ok(labContentRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<LabContent>> getFeaturedLabs() {
        return ResponseEntity.ok(labContentRepository.findByFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<LabContent> getLabBySlug(@PathVariable("slug") String slug) {
        return labContentRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
