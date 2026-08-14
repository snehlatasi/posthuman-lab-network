package org.posthumanlab.network.newsletter.config;

import org.posthumanlab.network.newsletter.email.NewsletterEmailChannel;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@ConfigurationProperties(prefix = "app.newsletter.email")
public class NewsletterEmailProperties {

    private boolean enabled = true;
    private String brevoApiKey;
    private String brevoApiUrl = "https://api.brevo.com/v3/smtp/email";
    private String senderName = "Posthuman Lab Network";
    private String replyTo = "posthumanlabnetwork@gmail.com";
    private String publicBaseUrl = "http://localhost:3000";
    private From from = new From();

    public boolean isReady() {
        return enabled && StringUtils.hasText(brevoApiKey);
    }

    public String getSenderEmail(NewsletterEmailChannel channel) {
        if (channel == NewsletterEmailChannel.BLOG) {
            return from.blog;
        }
        if (channel == NewsletterEmailChannel.EVENTS) {
            return from.events;
        }
        if (channel == NewsletterEmailChannel.MEDIA) {
            return from.media;
        }
        return from.updates;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getBrevoApiKey() {
        return brevoApiKey;
    }

    public void setBrevoApiKey(String brevoApiKey) {
        this.brevoApiKey = brevoApiKey;
    }

    public String getBrevoApiUrl() {
        return brevoApiUrl;
    }

    public void setBrevoApiUrl(String brevoApiUrl) {
        this.brevoApiUrl = brevoApiUrl;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getReplyTo() {
        return replyTo;
    }

    public void setReplyTo(String replyTo) {
        this.replyTo = replyTo;
    }

    public String getPublicBaseUrl() {
        return publicBaseUrl;
    }

    public void setPublicBaseUrl(String publicBaseUrl) {
        this.publicBaseUrl = publicBaseUrl;
    }

    public From getFrom() {
        return from;
    }

    public void setFrom(From from) {
        this.from = from;
    }

    public static class From {
        private String updates = "posthumanlabnetwork+updates@gmail.com";
        private String blog = "posthumanlabnetwork+blog@gmail.com";
        private String events = "posthumanlabnetwork+events@gmail.com";
        private String media = "posthumanlabnetwork+media@gmail.com";

        public String getUpdates() {
            return updates;
        }

        public void setUpdates(String updates) {
            this.updates = updates;
        }

        public String getBlog() {
            return blog;
        }

        public void setBlog(String blog) {
            this.blog = blog;
        }

        public String getEvents() {
            return events;
        }

        public void setEvents(String events) {
            this.events = events;
        }

        public String getMedia() {
            return media;
        }

        public void setMedia(String media) {
            this.media = media;
        }
    }
}
