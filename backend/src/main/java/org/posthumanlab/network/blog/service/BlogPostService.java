package org.posthumanlab.network.blog.service;

import org.posthumanlab.network.blog.dto.BlogPostDto;
import org.posthumanlab.network.blog.entity.BlogPost;
import org.posthumanlab.network.blog.entity.BlogPostStatus;
import org.posthumanlab.network.blog.repository.BlogPostRepository;
import org.posthumanlab.network.common.util.EnumUtils;
import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.newsletter.email.NewsletterEmailChannel;
import org.posthumanlab.network.newsletter.email.PublicationNotificationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;
    private final ApplicationEventPublisher eventPublisher;

    public BlogPostService(BlogPostRepository blogPostRepository, ApplicationEventPublisher eventPublisher) {
        this.blogPostRepository = blogPostRepository;
        this.eventPublisher = eventPublisher;
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
        return getPublishedPosts(null, null);
    }

    @Transactional(readOnly = true)
    public List<BlogPostDto> getPublishedPosts(Integer page, Integer size) {
        List<BlogPost> posts;
        if (page != null && size != null && page >= 0 && size > 0) {
            org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
            posts = blogPostRepository.findByStatusOrderByPublishedAtDesc(BlogPostStatus.PUBLISHED, pageable).getContent();
        } else {
            posts = blogPostRepository.findByStatusOrderByPublishedAtDesc(BlogPostStatus.PUBLISHED);
        }
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
        post.setSlug(SlugUtils.resolve(dto.getSlug(), dto.getTitle()));
        post.setExcerpt(dto.getExcerpt());
        post.setContent(dto.getContent());
        post.setAuthor(dto.getAuthor());
        post.setFeaturedImage(dto.getFeaturedImage());
        post.setStatus(dto.getStatus() != null && dto.getStatus().equalsIgnoreCase("DRAFT") ? BlogPostStatus.DRAFT : BlogPostStatus.PUBLISHED);

        BlogPost saved = blogPostRepository.save(post);
        notifyIfPublished(saved, false);
        return mapToDto(saved);
    }

    @Transactional
    public Optional<BlogPostDto> updatePost(Long id, BlogPostDto dto) {
        return blogPostRepository.findById(id).map(post -> {
            boolean wasPublished = post.getStatus() == BlogPostStatus.PUBLISHED;
            post.setTitle(dto.getTitle());
            if (dto.getSlug() != null && !dto.getSlug().trim().isEmpty()) {
                post.setSlug(dto.getSlug());
            }
            post.setExcerpt(dto.getExcerpt());
            post.setContent(dto.getContent());
            post.setAuthor(dto.getAuthor());
            post.setFeaturedImage(dto.getFeaturedImage());
            if (dto.getStatus() != null) {
                post.setStatus(EnumUtils.parse(BlogPostStatus.class, dto.getStatus()));
            }
            BlogPost saved = blogPostRepository.save(post);
            notifyIfPublished(saved, wasPublished);
            return mapToDto(saved);
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
            boolean wasPublished = post.getStatus() == BlogPostStatus.PUBLISHED;
            post.setStatus(publish ? BlogPostStatus.PUBLISHED : BlogPostStatus.DRAFT);
            if (publish && post.getPublishedAt() == null) {
                post.setPublishedAt(LocalDateTime.now());
            }
            BlogPost saved = blogPostRepository.save(post);
            notifyIfPublished(saved, wasPublished);
            return mapToDto(saved);
        });
    }

    private void notifyIfPublished(BlogPost post, boolean wasPublished) {
        if (!wasPublished && post.getStatus() == BlogPostStatus.PUBLISHED) {
            eventPublisher.publishEvent(new PublicationNotificationEvent(
                    NewsletterEmailChannel.BLOG,
                    post.getTitle(),
                    post.getExcerpt(),
                    "/blog/" + post.getSlug()
            ));
        }
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
