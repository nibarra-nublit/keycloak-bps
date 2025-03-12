package org.bps.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('bps-react-admin-admin')")
    public Map<String, String> getAdminDashboard() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Acceso autorizado al panel de administración");
        return response;
    }
}
