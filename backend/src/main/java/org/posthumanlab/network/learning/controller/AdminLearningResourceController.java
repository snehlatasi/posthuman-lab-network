package org.posthumanlab.network.learning.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.learning.entity.LearningResource;
import org.posthumanlab.network.learning.service.LearningResourceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/learning")
public class AdminLearningResourceController {

    private final LearningResourceService learningResourceService;

    public AdminLearningResourceController(LearningResourceService learningResourceService) {
        this.learningResourceService = learningResourceService;
    }

    @GetMapping
    public ResponseEntity<List<LearningResource>> getAllResourcesAdmin() {
        return ResponseEntity.ok(learningResourceService.getAll(null));
    }

    @PostMapping
    public ResponseEntity<LearningResource> createResource(@Valid @RequestBody LearningResource resource) {
        LearningResource saved = learningResourceService.create(resource);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningResource> updateResource(@PathVariable("id") Long id, @Valid @RequestBody LearningResource resource) {
        return learningResourceService.update(id, resource)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable("id") Long id) {
        learningResourceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
