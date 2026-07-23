package org.posthumanlab.network.publication.repository;

import org.posthumanlab.network.publication.entity.Publication;
import org.posthumanlab.network.publication.entity.PublicationStatus;
import org.posthumanlab.network.publication.entity.PublicationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    Optional<Publication> findBySlug(String slug);
    List<Publication> findByStatusOrderByPublishedAtDesc(PublicationStatus status);
    List<Publication> findByStatusAndPublicationTypeOrderByPublishedAtDesc(PublicationStatus status, PublicationType type);
}
