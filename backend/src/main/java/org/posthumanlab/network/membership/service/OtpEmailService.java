package org.posthumanlab.network.membership.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class OtpEmailService {

    private static final Logger log = LoggerFactory.getLogger(OtpEmailService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final HttpClient httpClient;
    private final boolean enabled;
    private final String fromAddress;
    private final String fromName;
    private final String subject;
    private final String brevoApiKey;
    private final String brevoApiUrl;

    public OtpEmailService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.member-auth.email.enabled:false}") boolean enabled,
            @Value("${app.member-auth.email.from:}") String fromAddress,
            @Value("${app.member-auth.email.from-name:Posthuman Lab Network}") String fromName,
            @Value("${app.member-auth.email.subject:Your Posthuman Lab Network verification code}") String subject,
            @Value("${BREVO_API_KEY:}") String brevoApiKey,
            @Value("${BREVO_API_URL:https://api.brevo.com/v3/smtp/email}") String brevoApiUrl) {
        this.mailSenderProvider = mailSenderProvider;
        this.httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();
        this.enabled = enabled;
        this.fromAddress = fromAddress;
        this.fromName = fromName;
        this.subject = subject;
        this.brevoApiKey = brevoApiKey;
        this.brevoApiUrl = brevoApiUrl;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void sendOtp(String recipientEmail, String otp, int ttlMinutes) {
        if (!enabled) {
            throw new IllegalStateException("Email OTP delivery is not configured.");
        }

        String text = "Your Posthuman Lab Network verification code is " + otp
                + ". It expires in " + ttlMinutes + " minutes. If you did not request this code, you can ignore this email.";

        if (StringUtils.hasText(brevoApiKey)) {
            sendWithBrevoApi(recipientEmail, text);
            return;
        }

        sendWithSmtp(recipientEmail, text);
    }

    private void sendWithSmtp(String recipientEmail, String text) {
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            throw new IllegalStateException("SMTP mail sender is not available.");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        if (StringUtils.hasText(fromAddress)) {
            message.setFrom(fromAddress);
        }
        message.setTo(recipientEmail);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
        log.info("Member OTP email accepted by SMTP provider for {}", recipientEmail);
    }

    private void sendWithBrevoApi(String recipientEmail, String text) {
        if (!StringUtils.hasText(fromAddress)) {
            throw new IllegalStateException("Brevo sender email is not configured.");
        }

        String body = "{"
                + "\"sender\":{\"name\":\"" + jsonEscape(fromName) + "\",\"email\":\"" + jsonEscape(fromAddress) + "\"},"
                + "\"to\":[{\"email\":\"" + jsonEscape(recipientEmail) + "\"}],"
                + "\"subject\":\"" + jsonEscape(subject) + "\","
                + "\"textContent\":\"" + jsonEscape(text) + "\""
                + "}";

        HttpRequest request = HttpRequest.newBuilder(URI.create(brevoApiUrl))
                .timeout(Duration.ofSeconds(15))
                .header("accept", "application/json")
                .header("api-key", brevoApiKey)
                .header("content-type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new IllegalStateException("Brevo API rejected OTP email with status " + response.statusCode());
            }
            log.info("Member OTP email accepted by Brevo API for {}", recipientEmail);
        } catch (IOException ex) {
            throw new IllegalStateException("Unable to connect to Brevo API for OTP email delivery.", ex);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Brevo API OTP email delivery was interrupted.", ex);
        }
    }

    private String jsonEscape(String value) {
        if (value == null) {
            return "";
        }
        StringBuilder escaped = new StringBuilder(value.length() + 16);
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            switch (c) {
                case '\\' -> escaped.append("\\\\");
                case '"' -> escaped.append("\\\"");
                case '\b' -> escaped.append("\\b");
                case '\f' -> escaped.append("\\f");
                case '\n' -> escaped.append("\\n");
                case '\r' -> escaped.append("\\r");
                case '\t' -> escaped.append("\\t");
                default -> {
                    if (c < 0x20) {
                        escaped.append(String.format("\\u%04x", (int) c));
                    } else {
                        escaped.append(c);
                    }
                }
            }
        }
        return escaped.toString();
    }
}