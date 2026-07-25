package org.posthumanlab.network.membership.service;

import org.posthumanlab.network.membership.dto.*;
import org.posthumanlab.network.membership.entity.Member;
import org.posthumanlab.network.membership.entity.MemberAccount;
import org.posthumanlab.network.membership.entity.MemberStatus;
import org.posthumanlab.network.membership.entity.MembershipApplication;
import org.posthumanlab.network.membership.repository.MemberAccountRepository;
import org.posthumanlab.network.membership.repository.MemberRepository;
import org.posthumanlab.network.membership.repository.MembershipApplicationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class MemberAccountAuthService {

    private static final int OTP_BOUND = 1_000_000;
    private static final int MAX_OTP_ATTEMPTS = 5;
    private static final String ACCOUNT_SUBJECT_PREFIX = "member-account-";

    private final MemberAccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final MembershipApplicationRepository applicationRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom secureRandom = new SecureRandom();
    private final boolean exposeOtp;
    private final int otpTtlMinutes;

    public MemberAccountAuthService(
            MemberAccountRepository accountRepository,
            MemberRepository memberRepository,
            MembershipApplicationRepository applicationRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.member-auth.expose-otp:false}") boolean exposeOtp,
            @Value("${app.member-auth.otp-ttl-minutes:10}") int otpTtlMinutes) {
        this.accountRepository = accountRepository;
        this.memberRepository = memberRepository;
        this.applicationRepository = applicationRepository;
        this.passwordEncoder = passwordEncoder;
        this.exposeOtp = exposeOtp;
        this.otpTtlMinutes = otpTtlMinutes;
    }

    @Transactional
    public MemberOtpChallengeResponse signup(MemberSignupRequest request) {
        String email = normalizeEmail(request.getEmail());
        if (accountRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("An account already exists for this email. Please sign in.");
        }

        MemberAccount account = new MemberAccount();
        account.setEmail(email);
        account.setFullName(request.getFullName().trim());
        account.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        String otp = issueOtp(account);
        accountRepository.save(account);

        return challengeResponse(email, otp);
    }

    @Transactional
    public MemberOtpChallengeResponse signin(MemberSigninRequest request) {
        String email = normalizeEmail(request.getEmail());
        MemberAccount account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), account.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String otp = issueOtp(account);
        accountRepository.save(account);
        return challengeResponse(email, otp);
    }

    @Transactional
    public MemberAuthResponse verifyOtp(MemberOtpVerifyRequest request) {
        String email = normalizeEmail(request.getEmail());
        MemberAccount account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid or expired verification code"));

        if (account.getOtpExpiresAt() == null || account.getOtpExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadCredentialsException("Invalid or expired verification code");
        }

        if (account.getFailedOtpAttempts() >= MAX_OTP_ATTEMPTS) {
            throw new BadCredentialsException("Too many verification attempts. Please request a new code.");
        }

        if (!passwordEncoder.matches(request.getOtp(), account.getOtpHash())) {
            account.setFailedOtpAttempts(account.getFailedOtpAttempts() + 1);
            accountRepository.save(account);
            throw new BadCredentialsException("Invalid or expired verification code");
        }

        account.setEmailVerified(true);
        account.setOtpHash(null);
        account.setOtpExpiresAt(null);
        account.setFailedOtpAttempts(0);
        accountRepository.save(account);

        return resolveMembershipStatus(account);
    }

    private String issueOtp(MemberAccount account) {
        String otp = String.format("%06d", secureRandom.nextInt(OTP_BOUND));
        account.setOtpHash(passwordEncoder.encode(otp));
        account.setOtpExpiresAt(LocalDateTime.now().plusMinutes(otpTtlMinutes));
        account.setFailedOtpAttempts(0);
        return otp;
    }

    private MemberOtpChallengeResponse challengeResponse(String email, String otp) {
        String message = "Verification code sent. Please confirm the OTP to continue.";
        return new MemberOtpChallengeResponse(email, message, exposeOtp ? otp : null);
    }

    private MemberAuthResponse resolveMembershipStatus(MemberAccount account) {
        String subjectId = toSubjectId(account);
        Optional<Member> existingMember = memberRepository.findByGoogleSubjectId(subjectId);
        if (!existingMember.isPresent()) {
            existingMember = memberRepository.findByEmail(account.getEmail());
        }

        if (existingMember.isPresent()) {
            Member member = existingMember.get();
            String status = member.getStatus() == MemberStatus.ACTIVE ? "APPROVED" : "REJECTED";
            return new MemberAuthResponse(status, null, member.getId(), subjectId, member.getEmail(), member.getFullName(), member.getProfileImageUrl());
        }

        Optional<MembershipApplication> existingApplication = applicationRepository.findByGoogleSubjectId(subjectId);
        if (!existingApplication.isPresent()) {
            existingApplication = applicationRepository.findByEmail(account.getEmail());
        }

        if (existingApplication.isPresent()) {
            MembershipApplication application = existingApplication.get();
            return new MemberAuthResponse(application.getStatus().name(), application.getId(), null, subjectId, application.getEmail(), application.getFullName(), application.getProfileImageUrl());
        }

        return new MemberAuthResponse("NOT_APPLIED", null, null, subjectId, account.getEmail(), account.getFullName(), null);
    }

    private String toSubjectId(MemberAccount account) {
        return ACCOUNT_SUBJECT_PREFIX + account.getId();
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }
}
