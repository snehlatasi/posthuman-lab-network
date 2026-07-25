package org.posthumanlab.network.curation.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.curation.entity.HomepageCuration;
import org.posthumanlab.network.curation.repository.HomepageCurationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/curation")
public class AdminCurationController {

    private final HomepageCurationRepository homepageCurationRepository;

    public AdminCurationController(HomepageCurationRepository homepageCurationRepository) {
        this.homepageCurationRepository = homepageCurationRepository;
    }

    @GetMapping
    public ResponseEntity<HomepageCuration> getCurationSettings() {
        return ResponseEntity.ok(homepageCurationRepository.findById(1L).orElseGet(HomepageCuration::new));
    }

    @PutMapping
    public ResponseEntity<HomepageCuration> updateCurationSettings(@Valid @RequestBody HomepageCuration curation) {
        curation.setId(1L);
        HomepageCuration updated = homepageCurationRepository.save(curation);
        return ResponseEntity.ok(updated);
    }
}
