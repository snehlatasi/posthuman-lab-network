package org.posthumanlab.network.learning.controller;

import org.posthumanlab.network.learning.entity.LearningResource;
import org.posthumanlab.network.learning.entity.LearningResourceType;
import org.posthumanlab.network.learning.service.LearningResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning")
public class LearningResourceController {

    private final LearningResourceService learningResourceService;

    public LearningResourceController(LearningResourceService learningResourceService) {
        this.learningResourceService = learningResourceService;
    }

    @GetMapping
    public ResponseEntity<List<LearningResource>> getAllResources(
            @RequestParam(required = false) LearningResourceType type) {
        return ResponseEntity.ok(learningResourceService.getAll(type));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<LearningResource>> getFeaturedResources() {
        return ResponseEntity.ok(learningResourceService.getFeatured());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<LearningResource> getResourceBySlug(@PathVariable("slug") String slug) {
        return learningResourceService.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
