package org.posthumanlab.network.membership.dto;

public class MemberOtpChallengeResponse {
    private String email;
    private String message;
    private String devOtp;

    public MemberOtpChallengeResponse() {}

    public MemberOtpChallengeResponse(String email, String message, String devOtp) {
        this.email = email;
        this.message = message;
        this.devOtp = devOtp;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getDevOtp() { return devOtp; }
    public void setDevOtp(String devOtp) { this.devOtp = devOtp; }
}
