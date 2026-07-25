package org.posthumanlab.network.membership.dto;

import jakarta.validation.constraints.NotBlank;

public class MembershipApplicationRequest {

    @NotBlank
    private String googleSubjectId;

    @NotBlank
    private String email;

    @NotBlank
    private String fullName;

    private String profileImageUrl;
    private String affiliation;
    private String role;
    private String country;

    @NotBlank
    private String areasOfInterest;

    private String bio;
    private String motivation;
    private String website;

    public MembershipApplicationRequest() {}

    public String getGoogleSubjectId() { return googleSubjectId; }
    public void setGoogleSubjectId(String googleSubjectId) { this.googleSubjectId = googleSubjectId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }

    public String getAffiliation() { return affiliation; }
    public void setAffiliation(String affiliation) { this.affiliation = affiliation; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getAreasOfInterest() { return areasOfInterest; }
    public void setAreasOfInterest(String areasOfInterest) { this.areasOfInterest = areasOfInterest; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getMotivation() { return motivation; }
    public void setMotivation(String motivation) { this.motivation = motivation; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
}
