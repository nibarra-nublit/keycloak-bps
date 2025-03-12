package org.bps.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    private String jwkSetUri;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/public/**").permitAll()
                        // Nota: estos patrones ahora usan las autoridades exactas que se extraen del token
                        .requestMatchers("/api/**").hasAuthority("bps-react-app-admin")
                        .requestMatchers("/admin/**").hasAuthority("bps-react-admin-admin")
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtResourceAccessConverter()))
                );

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();
    }

    @Bean
    public JwtAuthenticationConverter jwtResourceAccessConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new ResourceAccessRolesConverter());
        return converter;
    }

    // Conversor simplificado que extrae roles sin duplicarlos
    public static class ResourceAccessRolesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

        @Override
        public Collection<GrantedAuthority> convert(Jwt jwt) {
            Set<GrantedAuthority> authorities = new HashSet<>();

            // 1. Extraer roles de realm_access para compatibilidad
            Map<String, Object> realmAccess = jwt.getClaim("realm_access");
            if (realmAccess != null && realmAccess.containsKey("roles")) {
                List<String> realmRoles = (List<String>) realmAccess.get("roles");
                realmRoles.forEach(role ->
                        authorities.add(new SimpleGrantedAuthority(role))
                );
            }

            // 2. Obtener el resource_access del token
            Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
            if (resourceAccess == null) {
                return authorities;
            }

            // Procesar roles para cada cliente en resource_access
            resourceAccess.forEach((clientId, clientAccess) -> {
                if (clientAccess instanceof Map) {
                    Map<String, Object> clientMap = (Map<String, Object>) clientAccess;
                    if (clientMap.containsKey("roles")) {
                        List<String> clientRoles = (List<String>) clientMap.get("roles");
                        clientRoles.forEach(role -> {
                            // Añadir el rol sin prefijo (como aparece en tu config)
                            authorities.add(new SimpleGrantedAuthority(role));
                        });
                    }
                }
            });

            // Para depuración - imprime todas las autoridades
            System.out.println("Authorities extracted from token: " + authorities);

            return authorities;
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        // Tu configuración CORS se mantiene igual
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:*", "https://*.tu-dominio.com"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("X-Auth-Token"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}