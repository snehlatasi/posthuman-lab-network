package org.posthumanlab.network.newsletter.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscribeRequest;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscriberResponse;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscriptionResponse;
import org.posthumanlab.network.newsletter.service.NewsletterSubscriptionService;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.HtmlUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterSubscriptionController {

    private final NewsletterSubscriptionService subscriptionService;

    public NewsletterSubscriptionController(NewsletterSubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<NewsletterSubscriptionResponse> subscribe(
            @Valid @RequestBody NewsletterSubscribeRequest request) {
        return new ResponseEntity<>(subscriptionService.subscribe(request), HttpStatus.CREATED);
    }

    @PostMapping("/unsubscribe/{token}")
    public ResponseEntity<NewsletterSubscriptionResponse> unsubscribe(@PathVariable("token") String token) {
        return ResponseEntity.ok(subscriptionService.unsubscribe(token));
    }

    @GetMapping(value = "/unsubscribe/{token}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> unsubscribeByLink(@PathVariable("token") String token) {
        NewsletterSubscriptionResponse response = subscriptionService.unsubscribe(token);
        String html = """
                <!doctype html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>Unsubscribed | Posthuman Lab Network</title>
                  <style>
                    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #071018; color: #f4efe6; font-family: Arial, sans-serif; }
                    main { width: min(92vw, 560px); padding: 36px; border: 1px solid rgba(244,239,230,.18); background: rgba(255,255,255,.06); }
                    h1 { margin: 0 0 12px; font-size: 30px; }
                    p { line-height: 1.6; color: rgba(244,239,230,.78); }
                    a { color: #f2c879; }
                  </style>
                </head>
                <body>
                  <main>
                    <h1>You are unsubscribed</h1>
                    <p>%s will no longer receive Posthuman Lab Network email updates.</p>
                    <p><a href="/">Return to Posthuman Lab Network</a></p>
                  </main>
                </body>
                </html>
                """.formatted(HtmlUtils.htmlEscape(response.getEmail()));
        return ResponseEntity.ok(html);
    }

    @GetMapping("/subscribers")
    public ResponseEntity<List<NewsletterSubscriberResponse>> getSubscribers() {
        return ResponseEntity.ok(subscriptionService.getAllSubscribers());
    }

    @PutMapping("/subscribers/{id}/unsubscribe")
    public ResponseEntity<NewsletterSubscriptionResponse> unsubscribeSubscriber(@PathVariable("id") Long id) {
        return ResponseEntity.ok(subscriptionService.unsubscribeById(id));
    }

    @DeleteMapping("/subscribers/{id}")
    public ResponseEntity<Void> deleteSubscriber(@PathVariable("id") Long id) {
        subscriptionService.deleteSubscriber(id);
        return ResponseEntity.noContent().build();
    }
}
