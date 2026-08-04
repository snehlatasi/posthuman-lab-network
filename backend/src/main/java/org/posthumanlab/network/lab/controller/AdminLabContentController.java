package org.posthumanlab.network.lab.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.lab.entity.LabContent;
import org.posthumanlab.network.lab.service.LabContentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/labs")
public class AdminLabContentController {

    private final LabContentService labContentService;

    public AdminLabContentController(LabContentService labContentService) {
        this.labContentService = labContentService;
    }

    @GetMapping
    public ResponseEntity<List<LabContent>> getAllLabsAdmin() {
        return ResponseEntity.ok(labContentService.getAll());
    }

    @PostMapping
    public ResponseEntity<LabContent> createLab(@Valid @RequestBody LabContent lab) {
        LabContent saved = labContentService.create(lab);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabContent> updateLab(@PathVariable("id") Long id, @Valid @RequestBody LabContent lab) {
        return labContentService.update(id, lab)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLab(@PathVariable("id") Long id) {
        labContentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
