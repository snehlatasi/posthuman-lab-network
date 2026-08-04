package org.posthumanlab.network.curation.controller;

import org.posthumanlab.network.curation.service.PublicHomeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicHomeController {

    private final PublicHomeService publicHomeService;

    public PublicHomeController(PublicHomeService publicHomeService) {
        this.publicHomeService = publicHomeService;
    }

    @GetMapping("/home")
    public ResponseEntity<Map<String, Object>> getHomepageSummary() {
        return ResponseEntity.ok(publicHomeService.getHomepageSummary());
    }
}
