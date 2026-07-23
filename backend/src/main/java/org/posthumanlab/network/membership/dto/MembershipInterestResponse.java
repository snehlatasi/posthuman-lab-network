package org.posthumanlab.network.membership.dto;

import org.posthumanlab.network.membership.entity.MembershipInterest;
import org.posthumanlab.network.membership.entity.MembershipInterestStatus;

import java.time.LocalDateTime;

public class MembershipInterestResponse {
    private Long id;
    private String name;
    private String email;
    private String areaOfInterest;
    private String message;
    private MembershipInterestStatus status;
    private LocalDateTime createdAt;

    public MembershipInterestResponse() {}

    public MembershipInterestResponse(MembershipInterest mi) {
        this.id = mi.getId();
        this.name = mi.getName();
        this.email = mi.getEmail();
        this.areaOfInterest = mi.getAreaOfInterest();
        this.message = mi.getMessage();
        this.status = mi.getStatus();
        this.createdAt = mi.getCreatedAt();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAreaOfInterest() {
        return areaOfInterest;
    }

    public void setAreaOfInterest(String areaOfInterest) {
        this.areaOfInterest = areaOfInterest;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MembershipInterestStatus getStatus() {
        return status;
    }

    public void setStatus(MembershipInterestStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
