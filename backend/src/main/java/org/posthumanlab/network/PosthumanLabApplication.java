package org.posthumanlab.network;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class PosthumanLabApplication {
    public static void main(String[] args) {
        SpringApplication.run(PosthumanLabApplication.class, args);
    }
}
