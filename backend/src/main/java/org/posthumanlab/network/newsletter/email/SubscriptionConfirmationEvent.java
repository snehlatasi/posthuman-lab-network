package org.posthumanlab.network.newsletter.email;

public record SubscriptionConfirmationEvent(
        String name,
        String email,
        String interests,
        String unsubscribeToken
) {
}
