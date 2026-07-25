package org.posthumanlab.network.media.repository;

import org.posthumanlab.network.media.entity.MediaAsset;
import org.posthumanlab.network.media.entity.MediaType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaAssetRepository extends JpaRepository<MediaAsset, Long> {
    List<MediaAsset> findByMediaTypeOrderByCreatedAtDesc(MediaType mediaType);
    List<MediaAsset> findByFeaturedTrueOrderByCreatedAtDesc();
    List<MediaAsset> findAllByOrderByCreatedAtDesc();
}
