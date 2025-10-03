package com.sysco.cart_service.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

public class SwaggerConfig {
    @Bean
    public OpenAPI productServiceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Cart Service API")
                        .description("APIs for managing carts")
                        .version("v1.0"))
                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation")
                        .url("https://yourdocs.example.com"));
    }
}
