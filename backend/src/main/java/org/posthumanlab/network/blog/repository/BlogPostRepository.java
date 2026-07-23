package org.posthumanlab.network.blog.repository;

import org.posthumanlab.network.blog.entity.BlogPost;
import org.posthumanlab.network.blog.entity.BlogPostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByStatusOrderByPublishedAtDesc(BlogPostStatus status);
    Optional<BlogPost> findBySlugAndStatus(String slug, BlogPostStatus status);
    Optional<BlogPost> findBySlug(String slug);
}
