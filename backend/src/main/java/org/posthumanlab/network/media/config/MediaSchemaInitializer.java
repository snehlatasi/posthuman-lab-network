package org.posthumanlab.network.media.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class MediaSchemaInitializer {

    private static final Logger log = LoggerFactory.getLogger(MediaSchemaInitializer.class);

    @Bean
    ApplicationRunner ensureMediaPublishedColumn(JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                Integer count = jdbcTemplate.queryForObject(
                        """
                        select count(*)
                        from information_schema.columns
                        where table_name = 'MEDIA_ASSETS'
                          and column_name = 'PUBLISHED'
                        """,
                        Integer.class
                );

                if (count == null || count == 0) {
                    jdbcTemplate.execute("alter table media_assets add column published boolean default false");
                    jdbcTemplate.execute("update media_assets set published = false where published is null");
                }
            } catch (Exception ex) {
                log.warn("Unable to verify media published column during startup", ex);
            }
        };
    }
}
