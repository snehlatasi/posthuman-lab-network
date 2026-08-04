package org.posthumanlab.network.curation.service;

import org.posthumanlab.network.curation.entity.HomepageCuration;
import org.posthumanlab.network.curation.repository.HomepageCurationRepository;
import org.springframework.stereotype.Service;

@Service
public class HomepageCurationService {

    private static final Long HOMEPAGE_CURATION_ID = 1L;

    private final HomepageCurationRepository homepageCurationRepository;

    public HomepageCurationService(HomepageCurationRepository homepageCurationRepository) {
        this.homepageCurationRepository = homepageCurationRepository;
    }

    public HomepageCuration getHomepageCuration() {
        return homepageCurationRepository.findById(HOMEPAGE_CURATION_ID)
                .orElseGet(HomepageCuration::new);
    }

    public HomepageCuration updateHomepageCuration(HomepageCuration request) {
        HomepageCuration curation = homepageCurationRepository.findById(HOMEPAGE_CURATION_ID)
                .orElseGet(HomepageCuration::new);
        curation.setId(HOMEPAGE_CURATION_ID);
        curation.setFeaturedMasterclassId(request.getFeaturedMasterclassId());
        curation.setFeaturedPublicationId(request.getFeaturedPublicationId());
        curation.setFeaturedLabId(request.getFeaturedLabId());
        curation.setFeaturedVideoId(request.getFeaturedVideoId());
        curation.setFeaturedConversationId(request.getFeaturedConversationId());
        curation.setAnnouncementTitle(request.getAnnouncementTitle());
        curation.setAnnouncementMessage(request.getAnnouncementMessage());
        curation.setAnnouncementLink(request.getAnnouncementLink());
        curation.setAnnouncementActive(request.isAnnouncementActive());
        return homepageCurationRepository.save(curation);
    }
}
