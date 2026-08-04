package org.posthumanlab.network.curation.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.curation.entity.HomepageCuration;
import org.posthumanlab.network.curation.service.HomepageCurationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/curation")
public class AdminCurationController {

    private final HomepageCurationService homepageCurationService;

    public AdminCurationController(HomepageCurationService homepageCurationService) {
        this.homepageCurationService = homepageCurationService;
    }

    @GetMapping
    public ResponseEntity<HomepageCuration> getCurationSettings() {
        return ResponseEntity.ok(homepageCurationService.getHomepageCuration());
    }

    @PutMapping
    public ResponseEntity<HomepageCuration> updateCurationSettings(@Valid @RequestBody HomepageCuration curation) {
        HomepageCuration updated = homepageCurationService.updateHomepageCuration(curation);
        return ResponseEntity.ok(updated);
    }
}
