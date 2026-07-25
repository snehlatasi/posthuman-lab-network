package org.posthumanlab.network.learning.repository;

import org.posthumanlab.network.learning.entity.LearningResource;
import org.posthumanlab.network.learning.entity.LearningResourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearningResourceRepository extends JpaRepository<LearningResource, Long> {
    Optional<LearningResource> findBySlug(String slug);
    List<LearningResource> findByResourceTypeOrderByCreatedAtDesc(LearningResourceType resourceType);
    List<LearningResource> findByFeaturedTrueOrderByCreatedAtDesc();
    List<LearningResource> findAllByOrderByCreatedAtDesc();
}
