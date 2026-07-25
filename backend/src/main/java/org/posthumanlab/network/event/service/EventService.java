package org.posthumanlab.network.event.service;

import org.posthumanlab.network.common.exception.ResourceNotFoundException;
import org.posthumanlab.network.common.util.EnumUtils;
import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.event.dto.EventResponse;
import org.posthumanlab.network.event.dto.EventRequest;
import org.posthumanlab.network.event.entity.Event;
import org.posthumanlab.network.event.entity.EventStatus;
import org.posthumanlab.network.event.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(EventResponse::new)
                .collect(Collectors.toList());
    }

    public EventResponse getEventById(Long id) {
        return eventRepository.findById(id)
                .map(EventResponse::new)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + id));
    }

    public EventResponse getEventBySlug(String slug) {
        return eventRepository.findBySlug(slug)
                .map(EventResponse::new)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with slug: " + slug));
    }

    public List<EventResponse> getUpcomingEvents() {
        return eventRepository.findByStatusOrderByStartDateTimeAsc(EventStatus.UPCOMING).stream()
                .map(EventResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public EventResponse createEvent(EventRequest req) {
        Event event = new Event();
        event.setTitle(req.getTitle());
        event.setSlug(SlugUtils.resolve(req.getSlug(), req.getTitle()));
        event.setDescription(req.getDescription());
        event.setEventType(req.getEventType());
        event.setStartDateTime(req.getStartDateTime() != null ? req.getStartDateTime() : LocalDateTime.now().plusDays(7));
        event.setEndDateTime(req.getEndDateTime());
        event.setLocation(req.getLocation());
        event.setOnline(req.getOnline() != null ? req.getOnline() : false);
        event.setRegistrationUrl(req.getRegistrationUrl());
        event.setStatus(req.getStatus() != null && req.getStatus().equalsIgnoreCase("DRAFT") ? EventStatus.DRAFT : EventStatus.UPCOMING);

        return new EventResponse(eventRepository.save(event));
    }

    @Transactional
    public EventResponse updateEvent(Long id, EventRequest req) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + id));

        event.setTitle(req.getTitle());
        if (req.getSlug() != null && !req.getSlug().trim().isEmpty()) {
            event.setSlug(req.getSlug());
        }
        event.setDescription(req.getDescription());
        event.setEventType(req.getEventType());
        if (req.getStartDateTime() != null) event.setStartDateTime(req.getStartDateTime());
        if (req.getEndDateTime() != null) event.setEndDateTime(req.getEndDateTime());
        event.setLocation(req.getLocation());
        if (req.getOnline() != null) event.setOnline(req.getOnline());
        event.setRegistrationUrl(req.getRegistrationUrl());
        if (req.getStatus() != null) event.setStatus(EnumUtils.parse(EventStatus.class, req.getStatus()));

        return new EventResponse(eventRepository.save(event));
    }

    @Transactional
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with ID: " + id);
        }
        eventRepository.deleteById(id);
    }

    @Transactional
    public EventResponse setPublishStatus(Long id, boolean publish) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + id));
        event.setStatus(publish ? EventStatus.UPCOMING : EventStatus.DRAFT);
        return new EventResponse(eventRepository.save(event));
    }
}
