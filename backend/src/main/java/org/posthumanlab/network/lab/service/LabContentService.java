package org.posthumanlab.network.lab.service;

import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.lab.entity.LabContent;
import org.posthumanlab.network.lab.repository.LabContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabContentService {

    private final LabContentRepository labContentRepository;

    public LabContentService(LabContentRepository labContentRepository) {
        this.labContentRepository = labContentRepository;
    }

    public List<LabContent> getAll() {
        return labContentRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc();
    }

    public List<LabContent> getFeatured() {
        return labContentRepository.findByFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc();
    }

    public Optional<LabContent> getBySlug(String slug) {
        return labContentRepository.findBySlug(slug);
    }

    public LabContent create(LabContent lab) {
        normalizeSlug(lab);
        return labContentRepository.save(lab);
    }

    public Optional<LabContent> update(Long id, LabContent request) {
        return labContentRepository.findById(id).map(existing -> {
            existing.setName(request.getName());
            existing.setSlug(SlugUtils.resolve(request.getSlug(), request.getName()));
            existing.setShortDescription(request.getShortDescription());
            existing.setFullDescription(request.getFullDescription());
            existing.setResearchFocus(request.getResearchFocus());
            existing.setLeadName(request.getLeadName());
            existing.setLocation(request.getLocation());
            existing.setCoverImageUrl(request.getCoverImageUrl());
            existing.setFeatured(request.isFeatured());
            existing.setDisplayOrder(request.getDisplayOrder());
            return labContentRepository.save(existing);
        });
    }

    public void delete(Long id) {
        labContentRepository.deleteById(id);
    }

    private void normalizeSlug(LabContent lab) {
        lab.setSlug(SlugUtils.resolve(lab.getSlug(), lab.getName()));
    }
}
