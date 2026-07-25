package org.posthumanlab.network.membership.dto;

public class MemberAuthResponse {
    private String status;
    private Long applicationId;
    private Long memberId;
    private String accountSubjectId;
    private String email;
    private String fullName;
    private String profileImageUrl;

    public MemberAuthResponse() {}

    public MemberAuthResponse(String status, Long applicationId, Long memberId, String accountSubjectId, String email, String fullName, String profileImageUrl) {
        this.status = status;
        this.applicationId = applicationId;
        this.memberId = memberId;
        this.accountSubjectId = accountSubjectId;
        this.email = email;
        this.fullName = fullName;
        this.profileImageUrl = profileImageUrl;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }

    public Long getMemberId() { return memberId; }
    public void setMemberId(Long memberId) { this.memberId = memberId; }

    public String getAccountSubjectId() { return accountSubjectId; }
    public void setAccountSubjectId(String accountSubjectId) { this.accountSubjectId = accountSubjectId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }
}
