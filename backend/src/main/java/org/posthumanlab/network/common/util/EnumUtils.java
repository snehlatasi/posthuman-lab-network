package org.posthumanlab.network.common.util;

import java.util.Locale;

public final class EnumUtils {

    private EnumUtils() {
    }

    public static <E extends Enum<E>> E parse(Class<E> enumType, String rawValue) {
        if (rawValue == null) {
            throw new IllegalArgumentException(enumType.getSimpleName() + " value is required.");
        }

        return Enum.valueOf(enumType, rawValue.trim().toUpperCase(Locale.ROOT));
    }

    public static <E extends Enum<E>> E parseOrDefault(Class<E> enumType, String rawValue, E defaultValue) {
        if (rawValue == null || rawValue.trim().isEmpty()) {
            return defaultValue;
        }

        return parse(enumType, rawValue);
    }
}
