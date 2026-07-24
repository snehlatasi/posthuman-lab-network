package org.posthumanlab.network.blog.controller;

import jakarta.validation.Valid;
import org.posthumanlab.network.blog.dto.BlogPostDto;
import org.posthumanlab.network.blog.service.BlogPostService;
import org.posthumanlab.network.common.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogPostController {

    private final BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @GetMapping
    public ResponseEntity<List<BlogPostDto>> getPublishedPosts() {
        return ResponseEntity.ok(blogPostService.getPublishedPosts());
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<BlogPostDto>> getAllPosts() {
        return ResponseEntity.ok(blogPostService.getAllPosts());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogPostDto> getPostBySlug(@PathVariable("slug") String slug) {
        return blogPostService.getPostBySlug(slug)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with slug: " + slug));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<BlogPostDto> getPostById(@PathVariable("id") Long id) {
        return blogPostService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with ID: " + id));
    }

    @PostMapping
    public ResponseEntity<BlogPostDto> createPost(@Valid @RequestBody BlogPostDto request) {
        BlogPostDto created = blogPostService.createPost(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPostDto> updatePost(@PathVariable("id") Long id, @Valid @RequestBody BlogPostDto request) {
        return blogPostService.updatePost(id, request)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with ID: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") Long id) {
        if (blogPostService.deletePost(id)) {
            return ResponseEntity.noContent().build();
        }
        throw new ResourceNotFoundException("Blog post not found with ID: " + id);
    }

    @PutMapping("/{id}/publish")
    public ResponseEntity<BlogPostDto> publishPost(@PathVariable("id") Long id) {
        return blogPostService.setPublishStatus(id, true)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with ID: " + id));
    }

    @PutMapping("/{id}/unpublish")
    public ResponseEntity<BlogPostDto> unpublishPost(@PathVariable("id") Long id) {
        return blogPostService.setPublishStatus(id, false)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with ID: " + id));
    }
}

