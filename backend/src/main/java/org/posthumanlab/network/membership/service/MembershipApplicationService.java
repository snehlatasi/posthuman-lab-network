package org.posthumanlab.network.membership.service;

import org.posthumanlab.network.membership.dto.*;
import org.posthumanlab.network.membership.entity.*;
import org.posthumanlab.network.membership.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MembershipApplicationService {

    private final MembershipApplicationRepository applicationRepository;
    private final MemberRepository memberRepository;

    public MembershipApplicationService(
            MembershipApplicationRepository applicationRepository,
            MemberRepository memberRepository) {
        this.applicationRepository = applicationRepository;
        this.memberRepository = memberRepository;
    }

    public GoogleAuthResponse verifyGoogleIdentity(GoogleAuthRequest req) {
        // 1. Check if user is already an approved member
        Optional<Member> existingMember = memberRepository.findByGoogleSubjectId(req.getGoogleSubjectId());
        if (!existingMember.isPresent()) {
            existingMember = memberRepository.findByEmail(req.getEmail());
        }

        if (existingMember.isPresent()) {
            Member m = existingMember.get();
            return new GoogleAuthResponse("APPROVED", null, m.getId(), m.getEmail(), m.getFullName(), m.getProfileImageUrl());
        }

        // 2. Check if user has an existing application
        Optional<MembershipApplication> existingApp = applicationRepository.findByGoogleSubjectId(req.getGoogleSubjectId());
        if (!existingApp.isPresent()) {
            existingApp = applicationRepository.findByEmail(req.getEmail());
        }

        if (existingApp.isPresent()) {
            MembershipApplication app = existingApp.get();
            return new GoogleAuthResponse(app.getStatus().name(), app.getId(), null, app.getEmail(), app.getFullName(), app.getProfileImageUrl());
        }

        // 3. Not applied yet
        return new GoogleAuthResponse("NOT_APPLIED", null, null, req.getEmail(), req.getFullName(), req.getProfileImageUrl());
    }

    @Transactional
    public MembershipApplication submitApplication(MembershipApplicationRequest req) {
        // Prevent duplicates
        Optional<MembershipApplication> existing = applicationRepository.findByGoogleSubjectId(req.getGoogleSubjectId());
        if (existing.isPresent()) {
            return existing.get();
        }

        MembershipApplication app = new MembershipApplication();
        app.setGoogleSubjectId(req.getGoogleSubjectId());
        app.setEmail(req.getEmail());
        app.setFullName(req.getFullName());
        app.setProfileImageUrl(req.getProfileImageUrl());
        app.setAffiliation(req.getAffiliation());
        app.setRole(req.getRole());
        app.setCountry(req.getCountry());
        app.setAreasOfInterest(req.getAreasOfInterest());
        app.setBio(req.getBio());
        app.setMotivation(req.getMotivation());
        app.setWebsite(req.getWebsite());
        app.setStatus(MembershipApplicationStatus.PENDING);

        return applicationRepository.save(app);
    }

    public List<MembershipApplication> getAllApplications() {
        return applicationRepository.findAllByOrderBySubmittedAtDesc();
    }

    @Transactional
    public MembershipApplication approveApplication(Long id, String reviewerEmail) {
        MembershipApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with ID: " + id));

        app.setStatus(MembershipApplicationStatus.APPROVED);
        app.setReviewedAt(LocalDateTime.now());
        app.setReviewedBy(reviewerEmail);
        applicationRepository.save(app);

        // Create or activate corresponding Member record
        Optional<Member> existingMember = memberRepository.findByGoogleSubjectId(app.getGoogleSubjectId());
        if (!existingMember.isPresent()) {
            Member m = new Member();
            m.setGoogleSubjectId(app.getGoogleSubjectId());
            m.setEmail(app.getEmail());
            m.setFullName(app.getFullName());
            m.setProfileImageUrl(app.getProfileImageUrl());
            m.setAffiliation(app.getAffiliation());
            m.setRole(app.getRole());
            m.setCountry(app.getCountry());
            m.setAreasOfInterest(app.getAreasOfInterest());
            m.setStatus(MemberStatus.ACTIVE);
            memberRepository.save(m);
        }

        return app;
    }

    @Transactional
    public MembershipApplication rejectApplication(Long id, String reviewerEmail) {
        MembershipApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with ID: " + id));

        app.setStatus(MembershipApplicationStatus.REJECTED);
        app.setReviewedAt(LocalDateTime.now());
        app.setReviewedBy(reviewerEmail);
        return applicationRepository.save(app);
    }

    public List<Member> getAllApprovedMembers() {
        return memberRepository.findByStatusOrderByJoinedAtDesc(MemberStatus.ACTIVE);
    }

    public List<PublicMemberDto> getPublicDirectory() {
        return getAllApprovedMembers().stream()
                .map(m -> new PublicMemberDto(
                        m.getId(),
                        m.getFullName(),
                        m.getAffiliation(),
                        m.getRole(),
                        m.getCountry(),
                        m.getProfileImageUrl(),
                        m.getJoinedAt() != null ? m.getJoinedAt().toString() : null
                ))
                .collect(Collectors.toList());
    }
}
