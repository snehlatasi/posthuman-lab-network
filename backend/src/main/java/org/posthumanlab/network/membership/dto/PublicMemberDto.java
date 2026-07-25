package org.posthumanlab.network.membership.dto;

public class PublicMemberDto {

    private Long id;
    private String fullName;
    private String affiliation;
    private String role;
    private String country;
    private String profileImageUrl;
    private String joinedAt;

    public PublicMemberDto() {}

    public PublicMemberDto(Long id, String fullName, String affiliation, String role, String country, String profileImageUrl, String joinedAt) {
        this.id = id;
        this.fullName = fullName;
        this.affiliation = affiliation;
        this.role = role;
        this.country = country;
        this.profileImageUrl = profileImageUrl;
        this.joinedAt = joinedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAffiliation() { return affiliation; }
    public void setAffiliation(String affiliation) { this.affiliation = affiliation; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }

    public String getJoinedAt() { return joinedAt; }
    public void setJoinedAt(String joinedAt) { this.joinedAt = joinedAt; }
}
