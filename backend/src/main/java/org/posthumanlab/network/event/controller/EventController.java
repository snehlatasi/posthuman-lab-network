package org.posthumanlab.network.event.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.event.dto.EventRequest;
import org.posthumanlab.network.event.dto.EventResponse;
import org.posthumanlab.network.event.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventResponse>> getUpcomingEvents() {
        return ResponseEntity.ok(eventService.getUpcomingEvents());
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<EventResponse>> getAllAdminEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<EventResponse> getEventBySlug(@PathVariable("slug") String slug) {
        return ResponseEntity.ok(eventService.getEventBySlug(slug));
    }

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody EventRequest request) {
        EventResponse created = eventService.createEvent(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable("id") Long id, @Valid @RequestBody EventRequest request) {
        return ResponseEntity.ok(eventService.updateEvent(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable("id") Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/publish")
    public ResponseEntity<EventResponse> publishEvent(@PathVariable("id") Long id) {
        return ResponseEntity.ok(eventService.setPublishStatus(id, true));
    }

    @PutMapping("/{id}/unpublish")
    public ResponseEntity<EventResponse> unpublishEvent(@PathVariable("id") Long id) {
        return ResponseEntity.ok(eventService.setPublishStatus(id, false));
    }
}
