package org.posthumanlab.network.newsletter.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscribeRequest;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscriberResponse;
import org.posthumanlab.network.newsletter.dto.NewsletterSubscriptionResponse;
import org.posthumanlab.network.newsletter.service.NewsletterSubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/subscribers")
    public ResponseEntity<List<NewsletterSubscriberResponse>> getSubscribers() {
        return ResponseEntity.ok(subscriptionService.getAllSubscribers());
    }
}
