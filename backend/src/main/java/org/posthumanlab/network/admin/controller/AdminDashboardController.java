package org.posthumanlab.network.admin.controller;

import org.posthumanlab.network.admin.dto.AdminDashboardStatsDto;
import org.posthumanlab.network.blog.entity.BlogPostStatus;
import org.posthumanlab.network.blog.repository.BlogPostRepository;
import org.posthumanlab.network.collaboration.repository.CollaborationRequestRepository;
import org.posthumanlab.network.contact.repository.ContactRepository;
import org.posthumanlab.network.event.entity.EventStatus;
import org.posthumanlab.network.event.repository.EventRepository;
import org.posthumanlab.network.membership.entity.MembershipInterestStatus;
import org.posthumanlab.network.membership.repository.MembershipInterestRepository;
import org.posthumanlab.network.publication.repository.PublicationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    private final BlogPostRepository blogPostRepository;
    private final EventRepository eventRepository;
    private final PublicationRepository publicationRepository;
    private final MembershipInterestRepository membershipInterestRepository;
    private final ContactRepository contactRepository;
    private final CollaborationRequestRepository collaborationRequestRepository;

    public AdminDashboardController(
            BlogPostRepository blogPostRepository,
            EventRepository eventRepository,
            PublicationRepository publicationRepository,
            MembershipInterestRepository membershipInterestRepository,
            ContactRepository contactRepository,
            CollaborationRequestRepository collaborationRequestRepository) {
        this.blogPostRepository = blogPostRepository;
        this.eventRepository = eventRepository;
        this.publicationRepository = publicationRepository;
        this.membershipInterestRepository = membershipInterestRepository;
        this.contactRepository = contactRepository;
        this.collaborationRequestRepository = collaborationRequestRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminDashboardStatsDto> getDashboardStats() {
        AdminDashboardStatsDto dto = new AdminDashboardStatsDto();
        dto.setTotalBlogPosts(blogPostRepository.count());
        dto.setPublishedBlogPosts(blogPostRepository.countByStatus(BlogPostStatus.PUBLISHED));
        dto.setTotalEvents(eventRepository.count());
        dto.setUpcomingEvents(eventRepository.countByStatus(EventStatus.UPCOMING));
        dto.setTotalPublications(publicationRepository.count());
        dto.setPendingMemberships(membershipInterestRepository.countByStatus(MembershipInterestStatus.NEW));
        dto.setTotalContactMessages(contactRepository.count());
        dto.setTotalCollaborationRequests(collaborationRequestRepository.count());
        return ResponseEntity.ok(dto);
    }
}
