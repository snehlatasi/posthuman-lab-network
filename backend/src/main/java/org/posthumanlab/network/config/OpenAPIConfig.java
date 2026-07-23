package org.posthumanlab.network.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Posthuman Lab Network API")
                        .version("1.0.0")
                        .description("REST API specifications for the Posthuman Lab Network platform.")
                        .contact(new Contact()
                                .name("Posthuman Lab Network Team")
                                .email("contact@posthumanlab.org")));
    }
}
