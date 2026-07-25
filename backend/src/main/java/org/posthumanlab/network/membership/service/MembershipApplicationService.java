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

    private static final String ACCOUNT_SUBJECT_PREFIX = "member-account-";

    private final MembershipApplicationRepository applicationRepository;
    private final MemberRepository memberRepository;
    private final MemberAccountRepository accountRepository;

    public MembershipApplicationService(
            MembershipApplicationRepository applicationRepository,
            MemberRepository memberRepository,
            MemberAccountRepository accountRepository) {
        this.applicationRepository = applicationRepository;
        this.memberRepository = memberRepository;
        this.accountRepository = accountRepository;
    }

    @Transactional
    public MembershipApplication submitApplication(MembershipApplicationRequest req) {
        MemberAccount account = resolveVerifiedAccount(req);

        // Prevent duplicates
        Optional<MembershipApplication> existing = applicationRepository.findByGoogleSubjectId(req.getGoogleSubjectId());
        if (existing.isPresent()) {
            return existing.get();
        }
        existing = applicationRepository.findByEmail(account.getEmail());
        if (existing.isPresent()) {
            return existing.get();
        }

        MembershipApplication app = new MembershipApplication();
        app.setGoogleSubjectId(accountSubjectId(account));
        app.setEmail(account.getEmail());
        app.setFullName(account.getFullName());
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

    private MemberAccount resolveVerifiedAccount(MembershipApplicationRequest req) {
        String subjectId = req.getGoogleSubjectId();
        if (subjectId == null || !subjectId.startsWith(ACCOUNT_SUBJECT_PREFIX)) {
            throw new SecurityException("A verified member account is required before applying.");
        }

        Long accountId;
        try {
            accountId = Long.parseLong(subjectId.substring(ACCOUNT_SUBJECT_PREFIX.length()));
        } catch (NumberFormatException ex) {
            throw new SecurityException("A verified member account is required before applying.", ex);
        }

        MemberAccount account = accountRepository.findById(accountId)
                .orElseThrow(() -> new SecurityException("A verified member account is required before applying."));

        if (!account.isEmailVerified() || !account.getEmail().equalsIgnoreCase(req.getEmail())) {
            throw new SecurityException("A verified member account is required before applying.");
        }

        return account;
    }

    private String accountSubjectId(MemberAccount account) {
        return ACCOUNT_SUBJECT_PREFIX + account.getId();
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

    @Transactional
    public Member deactivateMember(Long id, String reviewerEmail) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + id));

        member.setStatus(MemberStatus.SUSPENDED);
        Member savedMember = memberRepository.save(member);

        Optional<MembershipApplication> existingApplication = applicationRepository.findByGoogleSubjectId(member.getGoogleSubjectId());
        if (!existingApplication.isPresent()) {
            existingApplication = applicationRepository.findByEmail(member.getEmail());
        }

        if (existingApplication.isPresent()) {
            MembershipApplication app = existingApplication.get();
            app.setStatus(MembershipApplicationStatus.REJECTED);
            app.setReviewedAt(LocalDateTime.now());
            app.setReviewedBy(reviewerEmail);
            applicationRepository.save(app);
        }

        return savedMember;
    }

    public List<Member> getAllApprovedMembers() {
        return memberRepository.findAllByOrderByJoinedAtDesc();
    }

    public List<PublicMemberDto> getPublicDirectory() {
        return memberRepository.findByStatusOrderByJoinedAtDesc(MemberStatus.ACTIVE).stream()
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
