package org.posthumanlab.network.admin.dto;

public class AdminDashboardStatsDto {

    private long totalBlogPosts;
    private long publishedBlogPosts;
    private long totalEvents;
    private long upcomingEvents;
    private long totalPublications;
    private long pendingMemberships;
    private long totalContactMessages;
    private long totalCollaborationRequests;

    public AdminDashboardStatsDto() {}

    public long getTotalBlogPosts() {
        return totalBlogPosts;
    }

    public void setTotalBlogPosts(long totalBlogPosts) {
        this.totalBlogPosts = totalBlogPosts;
    }

    public long getPublishedBlogPosts() {
        return publishedBlogPosts;
    }

    public void setPublishedBlogPosts(long publishedBlogPosts) {
        this.publishedBlogPosts = publishedBlogPosts;
    }

    public long getTotalEvents() {
        return totalEvents;
    }

    public void setTotalEvents(long totalEvents) {
        this.totalEvents = totalEvents;
    }

    public long getUpcomingEvents() {
        return upcomingEvents;
    }

    public void setUpcomingEvents(long upcomingEvents) {
        this.upcomingEvents = upcomingEvents;
    }

    public long getTotalPublications() {
        return totalPublications;
    }

    public void setTotalPublications(long totalPublications) {
        this.totalPublications = totalPublications;
    }

    public long getPendingMemberships() {
        return pendingMemberships;
    }

    public void setPendingMemberships(long pendingMemberships) {
        this.pendingMemberships = pendingMemberships;
    }

    public long getTotalContactMessages() {
        return totalContactMessages;
    }

    public void setTotalContactMessages(long totalContactMessages) {
        this.totalContactMessages = totalContactMessages;
    }

    public long getTotalCollaborationRequests() {
        return totalCollaborationRequests;
    }

    public void setTotalCollaborationRequests(long totalCollaborationRequests) {
        this.totalCollaborationRequests = totalCollaborationRequests;
    }
}
