package org.posthumanlab.network.collaboration.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.collaboration.dto.CollaborationRequestDto;
import org.posthumanlab.network.collaboration.service.CollaborationRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collaboration")
public class CollaborationRequestController {

    private final CollaborationRequestService collaborationRequestService;

    public CollaborationRequestController(CollaborationRequestService collaborationRequestService) {
        this.collaborationRequestService = collaborationRequestService;
    }

    @PostMapping
    public ResponseEntity<CollaborationRequestDto> submitCollaboration(@Valid @RequestBody CollaborationRequestDto request) {
        CollaborationRequestDto response = collaborationRequestService.saveRequest(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CollaborationRequestDto>> getAllRequests() {
        return ResponseEntity.ok(collaborationRequestService.getAllRequests());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable("id") Long id) {
        collaborationRequestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}

