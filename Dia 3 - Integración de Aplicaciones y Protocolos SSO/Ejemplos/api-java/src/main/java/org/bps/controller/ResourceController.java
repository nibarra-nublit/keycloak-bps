package org.bps.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ResourceController {

    @GetMapping("/userinfo")
    public Map<String, Object> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("username", jwt.getClaim("preferred_username"));
        userInfo.put("email", jwt.getClaim("email"));
        userInfo.put("firstName", jwt.getClaim("given_name"));
        userInfo.put("lastName", jwt.getClaim("family_name"));
        userInfo.put("enabled", jwt.getClaim("email_verified"));

        return userInfo;
    }

    @GetMapping("/resource")
    @PreAuthorize("hasAuthority('bps-react-admin-admin')")
    public Map<String, String> getProtectedResource() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Acceso autorizado al recurso protegido");
        return response;
    }
}