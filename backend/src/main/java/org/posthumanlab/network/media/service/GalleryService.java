package org.posthumanlab.network.media.service;

import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.media.entity.GalleryAlbum;
import org.posthumanlab.network.media.entity.GalleryImage;
import org.posthumanlab.network.media.repository.GalleryAlbumRepository;
import org.posthumanlab.network.media.repository.GalleryImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryService {

    private final GalleryAlbumRepository galleryAlbumRepository;
    private final GalleryImageRepository galleryImageRepository;

    public GalleryService(
            GalleryAlbumRepository galleryAlbumRepository,
            GalleryImageRepository galleryImageRepository) {
        this.galleryAlbumRepository = galleryAlbumRepository;
        this.galleryImageRepository = galleryImageRepository;
    }

    public List<GalleryAlbum> getAlbums() {
        return galleryAlbumRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc();
    }

    public List<GalleryImage> getAlbumImages(Long albumId) {
        return galleryImageRepository.findByAlbumIdOrderByDisplayOrderAsc(albumId);
    }

    public GalleryAlbum createAlbum(GalleryAlbum album) {
        album.setSlug(SlugUtils.resolve(album.getSlug(), album.getTitle()));
        return galleryAlbumRepository.save(album);
    }

    public GalleryImage addImageToAlbum(Long albumId, GalleryImage image) {
        image.setAlbumId(albumId);
        return galleryImageRepository.save(image);
    }

    public void deleteAlbum(Long id) {
        galleryImageRepository.deleteByAlbumId(id);
        galleryAlbumRepository.deleteById(id);
    }
}
