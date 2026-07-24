package org.posthumanlab.network.membership.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.membership.dto.MembershipInterestRequest;
import org.posthumanlab.network.membership.dto.MembershipInterestResponse;
import org.posthumanlab.network.membership.service.MembershipInterestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membership/interests")
public class MembershipInterestController {

    private final MembershipInterestService interestService;

    public MembershipInterestController(MembershipInterestService interestService) {
        this.interestService = interestService;
    }

    @PostMapping
    public ResponseEntity<MembershipInterestResponse> createInterest(@Valid @RequestBody MembershipInterestRequest request) {
        MembershipInterestResponse response = interestService.saveInterest(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MembershipInterestResponse>> getAllInterests() {
        return ResponseEntity.ok(interestService.getAllInterests());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<MembershipInterestResponse> updateStatus(
            @PathVariable("id") Long id,
            @RequestParam("status") String status) {
        return ResponseEntity.ok(interestService.updateInterestStatus(id, status));
    }
}

