package org.posthumanlab.network.membership.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.membership.dto.*;
import org.posthumanlab.network.membership.entity.MembershipApplication;
import org.posthumanlab.network.membership.service.MembershipApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class PublicMemberController {

    private final MembershipApplicationService applicationService;

    public PublicMemberController(MembershipApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/auth/google")
    public ResponseEntity<GoogleAuthResponse> verifyGoogleIdentity(@Valid @RequestBody GoogleAuthRequest req) {
        return ResponseEntity.ok(applicationService.verifyGoogleIdentity(req));
    }

    @PostMapping("/apply")
    public ResponseEntity<MembershipApplication> submitApplication(@Valid @RequestBody MembershipApplicationRequest req) {
        MembershipApplication created = applicationService.submitApplication(req);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/directory")
    public ResponseEntity<List<PublicMemberDto>> getPublicDirectory() {
        return ResponseEntity.ok(applicationService.getPublicDirectory());
    }
}
