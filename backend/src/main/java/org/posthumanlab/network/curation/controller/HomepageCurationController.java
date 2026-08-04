package org.posthumanlab.network.curation.controller;

import org.posthumanlab.network.curation.entity.HomepageCuration;
import org.posthumanlab.network.curation.service.HomepageCurationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/curation")
public class HomepageCurationController {

    private final HomepageCurationService homepageCurationService;

    public HomepageCurationController(HomepageCurationService homepageCurationService) {
        this.homepageCurationService = homepageCurationService;
    }

    @GetMapping("/homepage")
    public ResponseEntity<HomepageCuration> getHomepageCuration() {
        return ResponseEntity.ok(homepageCurationService.getHomepageCuration());
    }
}
