package org.posthumanlab.network.admin.service;

import org.posthumanlab.network.admin.dto.AdminDashboardStatsDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminDashboardStatsService {

    private final JdbcTemplate jdbcTemplate;

    public AdminDashboardStatsService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional(readOnly = true)
    public AdminDashboardStatsDto getDashboardStats() {
        return jdbcTemplate.queryForObject(
                """
                select
                    (select count(*) from blog_posts) as total_blog_posts,
                    (select count(*) from blog_posts where status = 'PUBLISHED') as published_blog_posts,
                    (select count(*) from events) as total_events,
                    (select count(*) from events where status = 'UPCOMING') as upcoming_events,
                    (select count(*) from publications) as total_publications,
                    (select count(*) from membership_interests where status = 'NEW') as pending_memberships,
                    (select count(*) from contact_messages) as total_contact_messages,
                    (select count(*) from collaboration_requests) as total_collaboration_requests
                """,
                (rs, rowNum) -> {
                    AdminDashboardStatsDto dto = new AdminDashboardStatsDto();
                    dto.setTotalBlogPosts(rs.getLong("total_blog_posts"));
                    dto.setPublishedBlogPosts(rs.getLong("published_blog_posts"));
                    dto.setTotalEvents(rs.getLong("total_events"));
                    dto.setUpcomingEvents(rs.getLong("upcoming_events"));
                    dto.setTotalPublications(rs.getLong("total_publications"));
                    dto.setPendingMemberships(rs.getLong("pending_memberships"));
                    dto.setTotalContactMessages(rs.getLong("total_contact_messages"));
                    dto.setTotalCollaborationRequests(rs.getLong("total_collaboration_requests"));
                    return dto;
                }
        );
    }
}
