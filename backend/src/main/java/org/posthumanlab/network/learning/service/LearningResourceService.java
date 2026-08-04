package org.posthumanlab.network.learning.service;

import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.learning.entity.LearningResource;
import org.posthumanlab.network.learning.entity.LearningResourceType;
import org.posthumanlab.network.learning.repository.LearningResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningResourceService {

    private final LearningResourceRepository learningResourceRepository;

    public LearningResourceService(LearningResourceRepository learningResourceRepository) {
        this.learningResourceRepository = learningResourceRepository;
    }

    public List<LearningResource> getAll(LearningResourceType type) {
        if (type != null) {
            return learningResourceRepository.findByResourceTypeOrderByCreatedAtDesc(type);
        }
        return learningResourceRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<LearningResource> getFeatured() {
        return learningResourceRepository.findByFeaturedTrueOrderByCreatedAtDesc();
    }

    public Optional<LearningResource> getBySlug(String slug) {
        return learningResourceRepository.findBySlug(slug);
    }

    public LearningResource create(LearningResource resource) {
        normalizeSlug(resource);
        return learningResourceRepository.save(resource);
    }

    public Optional<LearningResource> update(Long id, LearningResource request) {
        return learningResourceRepository.findById(id).map(existing -> {
            existing.setTitle(request.getTitle());
            existing.setSlug(SlugUtils.resolve(request.getSlug(), request.getTitle()));
            existing.setResourceType(request.getResourceType());
            existing.setInstructor(request.getInstructor());
            existing.setDescription(request.getDescription());
            existing.setCoverImageUrl(request.getCoverImageUrl());
            existing.setVideoUrl(request.getVideoUrl());
            existing.setDuration(request.getDuration());
            existing.setDifficultyLevel(request.getDifficultyLevel());
            existing.setFeatured(request.isFeatured());
            return learningResourceRepository.save(existing);
        });
    }

    public void delete(Long id) {
        learningResourceRepository.deleteById(id);
    }

    private void normalizeSlug(LearningResource resource) {
        resource.setSlug(SlugUtils.resolve(resource.getSlug(), resource.getTitle()));
    }
}
