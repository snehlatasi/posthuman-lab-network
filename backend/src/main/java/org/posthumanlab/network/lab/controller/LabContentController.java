package org.posthumanlab.network.lab.controller;

import org.posthumanlab.network.lab.entity.LabContent;
import org.posthumanlab.network.lab.service.LabContentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labs")
public class LabContentController {

    private final LabContentService labContentService;

    public LabContentController(LabContentService labContentService) {
        this.labContentService = labContentService;
    }

    @GetMapping
    public ResponseEntity<List<LabContent>> getAllLabs() {
        return ResponseEntity.ok(labContentService.getAll());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<LabContent>> getFeaturedLabs() {
        return ResponseEntity.ok(labContentService.getFeatured());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<LabContent> getLabBySlug(@PathVariable("slug") String slug) {
        return labContentService.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
