package org.posthumanlab.network.lab.repository;

import org.posthumanlab.network.lab.entity.LabContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LabContentRepository extends JpaRepository<LabContent, Long> {
    Optional<LabContent> findBySlug(String slug);
    List<LabContent> findByFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc();
    List<LabContent> findAllByOrderByDisplayOrderAscCreatedAtDesc();
}
