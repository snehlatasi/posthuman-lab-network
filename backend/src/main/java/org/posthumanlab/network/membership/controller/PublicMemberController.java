package org.posthumanlab.network.membership.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.membership.dto.*;
import org.posthumanlab.network.membership.entity.MembershipApplication;
import org.posthumanlab.network.membership.service.MemberAccountAuthService;
import org.posthumanlab.network.membership.service.MembershipApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class PublicMemberController {

    private final MembershipApplicationService applicationService;
    private final MemberAccountAuthService accountAuthService;

    public PublicMemberController(MembershipApplicationService applicationService, MemberAccountAuthService accountAuthService) {
        this.applicationService = applicationService;
        this.accountAuthService = accountAuthService;
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<MemberOtpChallengeResponse> signup(@Valid @RequestBody MemberSignupRequest req) {
        return ResponseEntity.ok(accountAuthService.signup(req));
    }

    @PostMapping("/auth/signin")
    public ResponseEntity<MemberOtpChallengeResponse> signin(@Valid @RequestBody MemberSigninRequest req) {
        return ResponseEntity.ok(accountAuthService.signin(req));
    }

    @PostMapping("/auth/verify-otp")
    public ResponseEntity<MemberAuthResponse> verifyOtp(@Valid @RequestBody MemberOtpVerifyRequest req) {
        return ResponseEntity.ok(accountAuthService.verifyOtp(req));
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
