package org.posthumanlab.network.newsletter.email;

public record PublicationNotificationEvent(
        NewsletterEmailChannel channel,
        String title,
        String summary,
        String path
) {
}
