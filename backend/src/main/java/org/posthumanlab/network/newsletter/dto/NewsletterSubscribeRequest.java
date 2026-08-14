package org.posthumanlab.network.newsletter.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class NewsletterSubscribeRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 120, message = "Name must not exceed 120 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please specify a valid email address")
    @Size(max = 180, message = "Email must not exceed 180 characters")
    private String email;

    @Size(max = 120, message = "Interests must not exceed 120 characters")
    private String interests;

    @AssertTrue(message = "Terms and conditions must be accepted")
    private boolean termsAccepted;

    @Size(max = 80, message = "Source must not exceed 80 characters")
    private String source;

    public NewsletterSubscribeRequest() {}

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

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public boolean isTermsAccepted() {
        return termsAccepted;
    }

    public void setTermsAccepted(boolean termsAccepted) {
        this.termsAccepted = termsAccepted;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
