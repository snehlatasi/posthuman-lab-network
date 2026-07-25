package org.posthumanlab.network.membership.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleTokenVerifierService {

    private final GoogleIdTokenVerifier verifier;
    private final boolean verificationEnabled;

    public GoogleTokenVerifierService(
            @Value("${app.google.client-id:}") String googleClientId,
            @Value("${app.google.verify-tokens:true}") boolean verificationEnabled) {
        this.verificationEnabled = verificationEnabled;

        NetHttpTransport transport = new NetHttpTransport();
        GsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        GoogleIdTokenVerifier.Builder builder = new GoogleIdTokenVerifier.Builder(transport, jsonFactory);
        if (googleClientId != null && !googleClientId.trim().isEmpty()) {
            builder.setAudience(Collections.singletonList(googleClientId));
        }

        this.verifier = builder.build();
    }

    public VerifiedGoogleToken verify(String idTokenString, String fallbackSubjectId, String fallbackEmail, String fallbackName, String fallbackPicture) {
        if (!verificationEnabled) {
            // For dev/testing environments where verification is explicitly disabled
            return new VerifiedGoogleToken(
                    fallbackSubjectId != null ? fallbackSubjectId : "dev-sub-id",
                    fallbackEmail != null ? fallbackEmail : "dev@posthumanlab.org",
                    fallbackName != null ? fallbackName : "Dev User",
                    fallbackPicture
            );
        }

        if (idTokenString == null || idTokenString.trim().isEmpty()) {
            throw new IllegalArgumentException("Google ID Token is missing. Authentication requires a valid Google ID token.");
        }

        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String userId = payload.getSubject();
                String email = payload.getEmail();
                boolean emailVerified = Boolean.TRUE.equals(payload.getEmailVerified());
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");

                if (!emailVerified) {
                    throw new SecurityException("Unverified Google Account email.");
                }

                return new VerifiedGoogleToken(userId, email, name, pictureUrl);
            } else {
                throw new SecurityException("Invalid Google ID Token.");
            }
        } catch (Exception e) {
            throw new SecurityException("Failed to verify Google ID Token: " + e.getMessage(), e);
        }
    }

    public static class VerifiedGoogleToken {
        private final String subjectId;
        private final String email;
        private final String name;
        private final String pictureUrl;

        public VerifiedGoogleToken(String subjectId, String email, String name, String pictureUrl) {
            this.subjectId = subjectId;
            this.email = email;
            this.name = name;
            this.pictureUrl = pictureUrl;
        }

        public String getSubjectId() { return subjectId; }
        public String getEmail() { return email; }
        public String getName() { return name; }
        public String getPictureUrl() { return pictureUrl; }
    }
}
