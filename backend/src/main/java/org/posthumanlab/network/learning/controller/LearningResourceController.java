package org.posthumanlab.network.learning.controller;

import org.posthumanlab.network.learning.entity.LearningResource;
import org.posthumanlab.network.learning.entity.LearningResourceType;
import org.posthumanlab.network.learning.repository.LearningResourceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning")
public class LearningResourceController {

    private final LearningResourceRepository learningResourceRepository;

    public LearningResourceController(LearningResourceRepository learningResourceRepository) {
        this.learningResourceRepository = learningResourceRepository;
    }

    @GetMapping
    public ResponseEntity<List<LearningResource>> getAllResources(
            @RequestParam(required = false) LearningResourceType type) {
        if (type != null) {
            return ResponseEntity.ok(learningResourceRepository.findByResourceTypeOrderByCreatedAtDesc(type));
        }
        return ResponseEntity.ok(learningResourceRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<LearningResource>> getFeaturedResources() {
        return ResponseEntity.ok(learningResourceRepository.findByFeaturedTrueOrderByCreatedAtDesc());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<LearningResource> getResourceBySlug(@PathVariable("slug") String slug) {
        return learningResourceRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
