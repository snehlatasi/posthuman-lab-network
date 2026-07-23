package org.posthumanlab.network.blog.service;

import org.posthumanlab.network.blog.dto.BlogPostDto;
import org.posthumanlab.network.blog.entity.BlogPost;
import org.posthumanlab.network.blog.entity.BlogPostStatus;
import org.posthumanlab.network.blog.repository.BlogPostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    @Transactional(readOnly = true)
    public List<BlogPostDto> getAllPosts() {
        List<BlogPost> posts = blogPostRepository.findAll();
        List<BlogPostDto> dtos = new ArrayList<BlogPostDto>();
        for (BlogPost post : posts) {
            dtos.add(mapToDto(post));
        }
        return dtos;
    }

    @Transactional(readOnly = true)
    public List<BlogPostDto> getPublishedPosts() {
        List<BlogPost> posts = blogPostRepository.findByStatusOrderByPublishedAtDesc(BlogPostStatus.PUBLISHED);
        List<BlogPostDto> dtos = new ArrayList<BlogPostDto>();
        for (BlogPost post : posts) {
            dtos.add(mapToDto(post));
        }
        return dtos;
    }

    @Transactional(readOnly = true)
    public Optional<BlogPostDto> getPostBySlug(String slug) {
        return blogPostRepository.findBySlugAndStatus(slug, BlogPostStatus.PUBLISHED)
                .map(this::mapToDto);
    }

    @Transactional(readOnly = true)
    public Optional<BlogPostDto> getPostById(Long id) {
        return blogPostRepository.findById(id).map(this::mapToDto);
    }

    @Transactional
    public BlogPostDto createPost(BlogPostDto dto) {
        BlogPost post = new BlogPost();
        post.setTitle(dto.getTitle());
        
        String slug = dto.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = dto.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
        }
        post.setSlug(slug);
        post.setExcerpt(dto.getExcerpt());
        post.setContent(dto.getContent());
        post.setAuthor(dto.getAuthor());
        post.setFeaturedImage(dto.getFeaturedImage());
        post.setStatus(dto.getStatus() != null && dto.getStatus().equalsIgnoreCase("DRAFT") ? BlogPostStatus.DRAFT : BlogPostStatus.PUBLISHED);

        BlogPost saved = blogPostRepository.save(post);
        return mapToDto(saved);
    }

    @Transactional
    public Optional<BlogPostDto> updatePost(Long id, BlogPostDto dto) {
        return blogPostRepository.findById(id).map(post -> {
            post.setTitle(dto.getTitle());
            if (dto.getSlug() != null && !dto.getSlug().trim().isEmpty()) {
                post.setSlug(dto.getSlug());
            }
            post.setExcerpt(dto.getExcerpt());
            post.setContent(dto.getContent());
            post.setAuthor(dto.getAuthor());
            post.setFeaturedImage(dto.getFeaturedImage());
            if (dto.getStatus() != null) {
                post.setStatus(BlogPostStatus.valueOf(dto.getStatus().toUpperCase()));
            }
            return mapToDto(blogPostRepository.save(post));
        });
    }

    @Transactional
    public boolean deletePost(Long id) {
        if (blogPostRepository.existsById(id)) {
            blogPostRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public Optional<BlogPostDto> setPublishStatus(Long id, boolean publish) {
        return blogPostRepository.findById(id).map(post -> {
            post.setStatus(publish ? BlogPostStatus.PUBLISHED : BlogPostStatus.DRAFT);
            if (publish && post.getPublishedAt() == null) {
                post.setPublishedAt(java.time.LocalDateTime.now());
            }
            return mapToDto(blogPostRepository.save(post));
        });
    }

    private BlogPostDto mapToDto(BlogPost post) {
        BlogPostDto dto = new BlogPostDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setSlug(post.getSlug());
        dto.setExcerpt(post.getExcerpt());
        dto.setContent(post.getContent());
        dto.setAuthor(post.getAuthor());
        dto.setFeaturedImage(post.getFeaturedImage());
        dto.setStatus(post.getStatus() != null ? post.getStatus().name() : null);
        dto.setPublishedAt(post.getPublishedAt());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());
        return dto;
    }
}
