package org.posthumanlab.network.lab.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.lab.entity.LabContent;
import org.posthumanlab.network.lab.repository.LabContentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/labs")
public class AdminLabContentController {

    private final LabContentRepository labContentRepository;

    public AdminLabContentController(LabContentRepository labContentRepository) {
        this.labContentRepository = labContentRepository;
    }

    @GetMapping
    public ResponseEntity<List<LabContent>> getAllLabsAdmin() {
        return ResponseEntity.ok(labContentRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<LabContent> createLab(@Valid @RequestBody LabContent lab) {
        if (lab.getSlug() == null || lab.getSlug().isBlank()) {
            lab.setSlug(lab.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-+|-+$", ""));
        }
        LabContent saved = labContentRepository.save(lab);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabContent> updateLab(@PathVariable("id") Long id, @Valid @RequestBody LabContent lab) {
        lab.setId(id);
        LabContent updated = labContentRepository.save(lab);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLab(@PathVariable("id") Long id) {
        labContentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
