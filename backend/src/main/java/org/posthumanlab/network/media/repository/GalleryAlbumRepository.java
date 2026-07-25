package org.posthumanlab.network.media.repository;

import org.posthumanlab.network.media.entity.GalleryAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GalleryAlbumRepository extends JpaRepository<GalleryAlbum, Long> {
    Optional<GalleryAlbum> findBySlug(String slug);
    List<GalleryAlbum> findAllByOrderByDisplayOrderAscCreatedAtDesc();
}
