package org.posthumanlab.network.newsletter.email;

public enum NewsletterEmailChannel {
    BLOG("blog", "New blog"),
    EVENTS("events", "New event"),
    MEDIA("media", "New media"),
    UPDATES("updates", "Network update");

    private final String tag;
    private final String subjectPrefix;

    NewsletterEmailChannel(String tag, String subjectPrefix) {
        this.tag = tag;
        this.subjectPrefix = subjectPrefix;
    }

    public String getTag() {
        return tag;
    }

    public String getSubjectPrefix() {
        return subjectPrefix;
    }
}
