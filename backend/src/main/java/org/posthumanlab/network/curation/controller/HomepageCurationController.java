package org.posthumanlab.network.curation.controller;

import org.posthumanlab.network.curation.entity.HomepageCuration;
import org.posthumanlab.network.curation.repository.HomepageCurationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/curation")
public class HomepageCurationController {

    private final HomepageCurationRepository homepageCurationRepository;

    public HomepageCurationController(HomepageCurationRepository homepageCurationRepository) {
        this.homepageCurationRepository = homepageCurationRepository;
    }

    @GetMapping("/homepage")
    public ResponseEntity<HomepageCuration> getHomepageCuration() {
        return ResponseEntity.ok(homepageCurationRepository.findById(1L).orElseGet(HomepageCuration::new));
    }
}
