package org.posthumanlab.network.common.util;

public final class SlugUtils {

    private SlugUtils() {
    }

    public static String fromTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            return "";
        }

        return title.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-+|-+$", "");
    }

    public static String resolve(String requestedSlug, String fallbackTitle) {
        if (requestedSlug != null && !requestedSlug.trim().isEmpty()) {
            return requestedSlug;
        }

        return fromTitle(fallbackTitle);
    }
}
