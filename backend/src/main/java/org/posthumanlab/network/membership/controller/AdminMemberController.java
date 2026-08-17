package org.posthumanlab.network.membership.controller;

import org.posthumanlab.network.membership.entity.Member;
import org.posthumanlab.network.membership.entity.MembershipApplication;
import org.posthumanlab.network.membership.service.MembershipApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/members")
public class AdminMemberController {

    private final MembershipApplicationService applicationService;

    public AdminMemberController(MembershipApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/applications")
    public ResponseEntity<List<MembershipApplication>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @PutMapping("/applications/{id}/approve")
    public ResponseEntity<MembershipApplication> approveApplication(@PathVariable("id") Long id, Authentication auth) {
        String reviewer = auth != null ? auth.getName() : "posthumanlabnetwork@gmail.com";
        return ResponseEntity.ok(applicationService.approveApplication(id, reviewer));
    }

    @PutMapping("/applications/{id}/reject")
    public ResponseEntity<MembershipApplication> rejectApplication(@PathVariable("id") Long id, Authentication auth) {
        String reviewer = auth != null ? auth.getName() : "posthumanlabnetwork@gmail.com";
        return ResponseEntity.ok(applicationService.rejectApplication(id, reviewer));
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable("id") Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<Member>> getAllApprovedMembers() {
        return ResponseEntity.ok(applicationService.getAllApprovedMembers());
    }

    @PutMapping("/list/{id}/deactivate")
    public ResponseEntity<Member> deactivateMember(@PathVariable("id") Long id, Authentication auth) {
        String reviewer = auth != null ? auth.getName() : "posthumanlabnetwork@gmail.com";
        return ResponseEntity.ok(applicationService.deactivateMember(id, reviewer));
    }

    @DeleteMapping("/list/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable("id") Long id) {
        applicationService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
