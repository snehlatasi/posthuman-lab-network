package org.posthumanlab.network.curation.service;

import org.posthumanlab.network.conversation.entity.Conversation;
import org.posthumanlab.network.conversation.repository.ConversationRepository;
import org.posthumanlab.network.curation.entity.HomepageCuration;
import org.posthumanlab.network.event.entity.Event;
import org.posthumanlab.network.event.entity.EventStatus;
import org.posthumanlab.network.event.repository.EventRepository;
import org.posthumanlab.network.lab.entity.LabContent;
import org.posthumanlab.network.lab.repository.LabContentRepository;
import org.posthumanlab.network.learning.entity.LearningResource;
import org.posthumanlab.network.learning.repository.LearningResourceRepository;
import org.posthumanlab.network.publication.entity.Publication;
import org.posthumanlab.network.publication.entity.PublicationStatus;
import org.posthumanlab.network.publication.repository.PublicationRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PublicHomeService {

    private final HomepageCurationService homepageCurationService;
    private final ConversationRepository conversationRepository;
    private final EventRepository eventRepository;
    private final LabContentRepository labContentRepository;
    private final LearningResourceRepository learningResourceRepository;
    private final PublicationRepository publicationRepository;

    public PublicHomeService(
            HomepageCurationService homepageCurationService,
            ConversationRepository conversationRepository,
            EventRepository eventRepository,
            LabContentRepository labContentRepository,
            LearningResourceRepository learningResourceRepository,
            PublicationRepository publicationRepository) {
        this.homepageCurationService = homepageCurationService;
        this.conversationRepository = conversationRepository;
        this.eventRepository = eventRepository;
        this.labContentRepository = labContentRepository;
        this.learningResourceRepository = learningResourceRepository;
        this.publicationRepository = publicationRepository;
    }

    public Map<String, Object> getHomepageSummary() {
        Map<String, Object> data = new HashMap<>();

        HomepageCuration curation = homepageCurationService.getHomepageCuration();
        List<Conversation> conversations =
                conversationRepository.findByFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc();
        List<Event> upcomingEvents = eventRepository.findByStatusOrderByStartDateTimeAsc(EventStatus.UPCOMING);
        List<LabContent> featuredLabs =
                labContentRepository.findByFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc();
        List<LearningResource> featuredLearning =
                learningResourceRepository.findByFeaturedTrueOrderByCreatedAtDesc();
        List<Publication> latestPublications =
                publicationRepository.findByStatusOrderByPublishedAtDesc(PublicationStatus.PUBLISHED);

        data.put("curation", curation);
        data.put("conversations", conversations);
        data.put("upcomingEvents", upcomingEvents);
        data.put("featuredLabs", featuredLabs);
        data.put("featuredLearning", featuredLearning);
        data.put("latestPublications", latestPublications);

        return data;
    }
}
