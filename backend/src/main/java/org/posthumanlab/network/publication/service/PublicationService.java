package org.posthumanlab.network.publication.service;

import org.posthumanlab.network.common.exception.ResourceNotFoundException;
import org.posthumanlab.network.common.util.EnumUtils;
import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.publication.dto.PublicationRequest;
import org.posthumanlab.network.publication.dto.PublicationResponse;
import org.posthumanlab.network.publication.entity.Publication;
import org.posthumanlab.network.publication.entity.PublicationStatus;
import org.posthumanlab.network.publication.entity.PublicationType;
import org.posthumanlab.network.publication.repository.PublicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PublicationService {

    private final PublicationRepository publicationRepository;

    public PublicationService(PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    public List<PublicationResponse> getAllPublications() {
        return publicationRepository.findAll().stream()
                .map(PublicationResponse::new)
                .collect(Collectors.toList());
    }

    public List<PublicationResponse> getPublishedPublications(PublicationType type) {
        if (type != null) {
            return publicationRepository.findByStatusAndPublicationTypeOrderByPublishedAtDesc(PublicationStatus.PUBLISHED, type).stream()
                    .map(PublicationResponse::new)
                    .collect(Collectors.toList());
        }
        return publicationRepository.findByStatusOrderByPublishedAtDesc(PublicationStatus.PUBLISHED).stream()
                .map(PublicationResponse::new)
                .collect(Collectors.toList());
    }

    public PublicationResponse getPublicationById(Long id) {
        Publication pub = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication not found with ID: " + id));
        return new PublicationResponse(pub);
    }

    public PublicationResponse getPublicationBySlug(String slug) {
        Publication pub = publicationRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Publication not found with slug: " + slug));
        if (pub.getStatus() != PublicationStatus.PUBLISHED) {
            throw new ResourceNotFoundException("Publication not found or not published with slug: " + slug);
        }
        return new PublicationResponse(pub);
    }

    @Transactional
    public PublicationResponse createPublication(PublicationRequest req) {
        Publication pub = new Publication();
        pub.setTitle(req.getTitle());
        pub.setSlug(SlugUtils.resolve(req.getSlug(), req.getTitle()));
        pub.setSummary(req.getSummary());
        pub.setContent(req.getContent());
        pub.setAuthorDisplayName(req.getAuthorDisplayName());
        if (req.getPublicationType() != null) {
            pub.setPublicationType(EnumUtils.parse(PublicationType.class, req.getPublicationType()));
        } else {
            pub.setPublicationType(PublicationType.ARTICLE);
        }
        pub.setStatus(req.getStatus() != null && req.getStatus().equalsIgnoreCase("DRAFT") ? PublicationStatus.DRAFT : PublicationStatus.PUBLISHED);
        pub.setPublishedAt(req.getPublishedAt() != null ? req.getPublishedAt() : LocalDateTime.now());

        return new PublicationResponse(publicationRepository.save(pub));
    }

    @Transactional
    public PublicationResponse updatePublication(Long id, PublicationRequest req) {
        Publication pub = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication not found with ID: " + id));

        pub.setTitle(req.getTitle());
        if (req.getSlug() != null && !req.getSlug().trim().isEmpty()) {
            pub.setSlug(req.getSlug());
        }
        pub.setSummary(req.getSummary());
        pub.setContent(req.getContent());
        pub.setAuthorDisplayName(req.getAuthorDisplayName());
        if (req.getPublicationType() != null) {
            pub.setPublicationType(EnumUtils.parse(PublicationType.class, req.getPublicationType()));
        }
        if (req.getStatus() != null) {
            pub.setStatus(EnumUtils.parse(PublicationStatus.class, req.getStatus()));
        }

        return new PublicationResponse(publicationRepository.save(pub));
    }

    @Transactional
    public void deletePublication(Long id) {
        if (!publicationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Publication not found with ID: " + id);
        }
        publicationRepository.deleteById(id);
    }

    @Transactional
    public PublicationResponse setPublishStatus(Long id, boolean publish) {
        Publication pub = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication not found with ID: " + id));
        pub.setStatus(publish ? PublicationStatus.PUBLISHED : PublicationStatus.DRAFT);
        if (publish && pub.getPublishedAt() == null) {
            pub.setPublishedAt(LocalDateTime.now());
        }
        return new PublicationResponse(publicationRepository.save(pub));
    }
}
