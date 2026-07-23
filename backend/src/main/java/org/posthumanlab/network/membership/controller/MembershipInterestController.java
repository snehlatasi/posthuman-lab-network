package org.posthumanlab.network.membership.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.membership.dto.MembershipInterestRequest;
import org.posthumanlab.network.membership.dto.MembershipInterestResponse;
import org.posthumanlab.network.membership.service.MembershipInterestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @org.springframework.web.bind.annotation.GetMapping
    public ResponseEntity<java.util.List<MembershipInterestResponse>> getAllInterests() {
        return ResponseEntity.ok(interestService.getAllInterests());
    }

    @org.springframework.web.bind.annotation.PutMapping("/{id}/status")
    public ResponseEntity<MembershipInterestResponse> updateStatus(
            @org.springframework.web.bind.annotation.PathVariable("id") Long id,
            @org.springframework.web.bind.annotation.RequestParam("status") String status) {
        return ResponseEntity.ok(interestService.updateInterestStatus(id, status));
    }
}
