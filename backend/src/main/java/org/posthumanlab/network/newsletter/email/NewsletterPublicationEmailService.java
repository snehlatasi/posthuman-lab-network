package org.posthumanlab.network.newsletter.email;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.posthumanlab.network.newsletter.config.NewsletterEmailProperties;
import org.posthumanlab.network.newsletter.entity.NewsletterSubscriber;
import org.posthumanlab.network.newsletter.entity.NewsletterSubscriberStatus;
import org.posthumanlab.network.newsletter.repository.NewsletterSubscriberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.util.StringUtils;
import org.springframework.web.util.HtmlUtils;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NewsletterPublicationEmailService {

    private static final Logger log = LoggerFactory.getLogger(NewsletterPublicationEmailService.class);

    private final NewsletterSubscriberRepository subscriberRepository;
    private final NewsletterEmailProperties properties;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public NewsletterPublicationEmailService(
            NewsletterSubscriberRepository subscriberRepository,
            NewsletterEmailProperties properties,
            ObjectMapper objectMapper) {
        this.subscriberRepository = subscriberRepository;
        this.properties = properties;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void sendPublicationNotice(PublicationNotificationEvent event) {
        if (!properties.isReady()) {
            log.info("Newsletter publication email skipped because Brevo newsletter email is not configured.");
            return;
        }

        List<NewsletterSubscriber> subscribers = subscriberRepository
                .findByStatusOrderBySubscribedAtDesc(NewsletterSubscriberStatus.ACTIVE);
        if (subscribers.isEmpty()) {
            log.info("Newsletter publication email skipped because there are no active subscribers.");
            return;
        }

        int sent = 0;
        int failed = 0;
        for (NewsletterSubscriber subscriber : subscribers) {
            try {
                sendToSubscriber(event, subscriber);
                sent++;
            } catch (RuntimeException ex) {
                failed++;
                log.warn("Unable to send {} newsletter email to {}", event.channel().getTag(), subscriber.getEmail(), ex);
            }
        }
        log.info("Newsletter publication email completed for {}: sent={}, failed={}", event.channel().getTag(), sent, failed);
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void sendSubscriptionConfirmation(SubscriptionConfirmationEvent event) {
        if (!properties.isReady()) {
            log.info("Newsletter confirmation email skipped because Brevo newsletter email is not configured.");
            return;
        }

        String unsubscribeUrl = absoluteUrl("/api/newsletter/unsubscribe/" + event.unsubscribeToken());
        String subject = "Welcome to Posthuman Lab Network updates";
        String htmlContent = buildConfirmationHtmlContent(event, unsubscribeUrl);
        String textContent = buildConfirmationTextContent(event, unsubscribeUrl);

        try {
            sendBrevoEmail(
                    NewsletterEmailChannel.UPDATES,
                    recipient(event.name(), event.email()),
                    subject,
                    htmlContent,
                    textContent
            );
            log.info("Newsletter confirmation email accepted for {}", event.email());
        } catch (RuntimeException ex) {
            log.warn("Unable to send newsletter confirmation email to {}", event.email(), ex);
        }
    }

    private void sendToSubscriber(PublicationNotificationEvent event, NewsletterSubscriber subscriber) {
        String contentUrl = absoluteUrl(event.path());
        String unsubscribeUrl = absoluteUrl("/api/newsletter/unsubscribe/" + subscriber.getUnsubscribeToken());
        String subject = event.channel().getSubjectPrefix() + ": " + event.title();
        String htmlContent = buildHtmlContent(event, subscriber, contentUrl, unsubscribeUrl);
        String textContent = buildTextContent(event, contentUrl, unsubscribeUrl);

        sendBrevoEmail(
                event.channel(),
                recipient(subscriber),
                subject,
                htmlContent,
                textContent
        );
    }

    private void sendBrevoEmail(
            NewsletterEmailChannel channel,
            Map<String, String> recipient,
            String subject,
            String htmlContent,
            String textContent) {
        HttpRequest request = HttpRequest.newBuilder(URI.create(properties.getBrevoApiUrl()))
                .timeout(Duration.ofSeconds(15))
                .header("accept", "application/json")
                .header("api-key", properties.getBrevoApiKey())
                .header("content-type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(buildBrevoPayload(channel, recipient, subject, htmlContent, textContent)))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new IllegalStateException("Brevo API rejected newsletter email with status " + response.statusCode());
            }
        } catch (IOException ex) {
            throw new IllegalStateException("Unable to connect to Brevo API for newsletter delivery.", ex);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Brevo API newsletter delivery was interrupted.", ex);
        }
    }

    private String buildBrevoPayload(
            NewsletterEmailChannel channel,
            Map<String, String> recipient,
            String subject,
            String htmlContent,
            String textContent) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("sender", Map.of(
                "name", properties.getSenderName(),
                "email", properties.getSenderEmail(channel)
        ));
        payload.put("to", List.of(recipient));
        payload.put("replyTo", Map.of(
                "name", properties.getSenderName(),
                "email", properties.getReplyTo()
        ));
        payload.put("subject", subject);
        payload.put("htmlContent", htmlContent);
        payload.put("textContent", textContent);
        payload.put("tags", List.of("posthuman-newsletter", channel.getTag()));

        try {
            return objectMapper.writeValueAsString(payload);
        } catch (JsonProcessingException ex) {
            throw new IllegalStateException("Unable to build Brevo newsletter payload.", ex);
        }
    }

    private Map<String, String> recipient(NewsletterSubscriber subscriber) {
        Map<String, String> recipient = new HashMap<>();
        recipient.put("email", subscriber.getEmail());
        if (StringUtils.hasText(subscriber.getName())) {
            recipient.put("name", subscriber.getName());
        }
        return recipient;
    }

    private Map<String, String> recipient(String name, String email) {
        Map<String, String> recipient = new HashMap<>();
        recipient.put("email", email);
        if (StringUtils.hasText(name)) {
            recipient.put("name", name);
        }
        return recipient;
    }

    private String buildHtmlContent(
            PublicationNotificationEvent event,
            NewsletterSubscriber subscriber,
            String contentUrl,
            String unsubscribeUrl) {
        String title = HtmlUtils.htmlEscape(event.title());
        String summary = HtmlUtils.htmlEscape(compactSummary(event.summary()));
        String name = StringUtils.hasText(subscriber.getName()) ? HtmlUtils.htmlEscape(subscriber.getName()) : "there";
        return """
                <!doctype html>
                <html lang="en">
                <body style="margin:0;background:#071018;color:#f4efe6;font-family:Arial,sans-serif;">
                  <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" style="background:#071018;padding:28px 0;">
                    <tr>
                      <td align="center">
                        <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" style="max-width:620px;border:1px solid rgba(244,239,230,.18);background:#101820;">
                          <tr>
                            <td style="padding:30px;">
                              <p style="margin:0 0 18px;color:#f2c879;text-transform:uppercase;letter-spacing:.08em;font-size:12px;">Posthuman Lab Network</p>
                              <h1 style="margin:0 0 14px;font-size:28px;line-height:1.2;color:#fff;">%s</h1>
                              <p style="margin:0 0 20px;color:#d9d2c7;line-height:1.6;">Hello %s, %s</p>
                              <p style="margin:0 0 28px;">
                                <a href="%s" style="display:inline-block;background:#f2c879;color:#071018;text-decoration:none;padding:12px 18px;font-weight:700;">Open update</a>
                              </p>
                              <p style="margin:0;color:#9c9488;font-size:12px;line-height:1.5;">
                                You received this because you subscribed to Posthuman Lab Network updates.
                                <a href="%s" style="color:#f2c879;">Unsubscribe</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(title, name, summary, contentUrl, unsubscribeUrl);
    }

    private String buildTextContent(PublicationNotificationEvent event, String contentUrl, String unsubscribeUrl) {
        return event.channel().getSubjectPrefix() + ": " + event.title() + "\n\n"
                + compactSummary(event.summary()) + "\n\n"
                + "Open update: " + contentUrl + "\n"
                + "Unsubscribe: " + unsubscribeUrl;
    }

    private String buildConfirmationHtmlContent(SubscriptionConfirmationEvent event, String unsubscribeUrl) {
        String name = StringUtils.hasText(event.name()) ? HtmlUtils.htmlEscape(event.name()) : "there";
        String interests = HtmlUtils.htmlEscape(formatInterests(event.interests()));
        return """
                <!doctype html>
                <html lang="en">
                <body style="margin:0;background:#071018;color:#f4efe6;font-family:Arial,sans-serif;">
                  <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" style="background:#071018;padding:28px 0;">
                    <tr>
                      <td align="center">
                        <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" style="max-width:620px;border:1px solid rgba(244,239,230,.18);background:#101820;">
                          <tr>
                            <td style="padding:30px;">
                              <p style="margin:0 0 18px;color:#f2c879;text-transform:uppercase;letter-spacing:.08em;font-size:12px;">Posthuman Lab Network</p>
                              <h1 style="margin:0 0 14px;font-size:28px;line-height:1.2;color:#fff;">You are subscribed</h1>
                              <p style="margin:0 0 18px;color:#d9d2c7;line-height:1.6;">Hello %s, welcome to the Posthuman Lab Network updates list.</p>
                              <p style="margin:0 0 18px;color:#d9d2c7;line-height:1.6;">You will receive selected notes when the network publishes new blogs, events, media, publications, and research updates.</p>
                              <p style="margin:0 0 28px;color:#d9d2c7;line-height:1.6;"><strong style="color:#fff;">Subscription focus:</strong> %s</p>
                              <p style="margin:0 0 28px;">
                                <a href="%s" style="display:inline-block;background:#f2c879;color:#071018;text-decoration:none;padding:12px 18px;font-weight:700;">Visit the network</a>
                              </p>
                              <p style="margin:0;color:#9c9488;font-size:12px;line-height:1.5;">
                                You can leave the updates list at any time.
                                <a href="%s" style="color:#f2c879;">Unsubscribe</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(name, interests, absoluteUrl("/"), unsubscribeUrl);
    }

    private String buildConfirmationTextContent(SubscriptionConfirmationEvent event, String unsubscribeUrl) {
        return "You are subscribed to Posthuman Lab Network updates.\n\n"
                + "You will receive selected notes when the network publishes new blogs, events, media, publications, and research updates.\n\n"
                + "Subscription focus: " + formatInterests(event.interests()) + "\n"
                + "Visit the network: " + absoluteUrl("/") + "\n"
                + "Unsubscribe: " + unsubscribeUrl;
    }

    private String formatInterests(String interests) {
        if (!StringUtils.hasText(interests)) {
            return "All network updates";
        }
        return interests.replace('-', ' ').replace('_', ' ');
    }

    private String compactSummary(String value) {
        if (!StringUtils.hasText(value)) {
            return "A new update has been published.";
        }
        String normalized = value.replaceAll("<[^>]*>", " ").replaceAll("\\s+", " ").trim();
        if (normalized.length() <= 220) {
            return normalized;
        }
        return normalized.substring(0, 217).trim() + "...";
    }

    private String absoluteUrl(String path) {
        if (path != null && (path.startsWith("http://") || path.startsWith("https://"))) {
            return path;
        }
        String base = properties.getPublicBaseUrl();
        if (!StringUtils.hasText(base)) {
            base = "http://localhost:3000";
        }
        String cleanBase = base.endsWith("/") ? base.substring(0, base.length() - 1) : base;
        String cleanPath = path != null && path.startsWith("/") ? path : "/" + path;
        return cleanBase + cleanPath;
    }
}
