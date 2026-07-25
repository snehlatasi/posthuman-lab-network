package org.posthumanlab.network.learning.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.learning.entity.LearningResource;
import org.posthumanlab.network.learning.repository.LearningResourceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/learning")
public class AdminLearningResourceController {

    private final LearningResourceRepository learningResourceRepository;

    public AdminLearningResourceController(LearningResourceRepository learningResourceRepository) {
        this.learningResourceRepository = learningResourceRepository;
    }

    @GetMapping
    public ResponseEntity<List<LearningResource>> getAllResourcesAdmin() {
        return ResponseEntity.ok(learningResourceRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<LearningResource> createResource(@Valid @RequestBody LearningResource resource) {
        if (resource.getSlug() == null || resource.getSlug().isBlank()) {
            resource.setSlug(SlugUtils.fromTitle(resource.getTitle()));
        }
        LearningResource saved = learningResourceRepository.save(resource);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningResource> updateResource(@PathVariable("id") Long id, @Valid @RequestBody LearningResource resource) {
        resource.setId(id);
        LearningResource updated = learningResourceRepository.save(resource);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable("id") Long id) {
        learningResourceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
