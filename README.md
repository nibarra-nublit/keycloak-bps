# BPS - Curso de Keycloak

## Temario

### **Dia 1**: Nivelación - Gestión de Usuarios, Roles y Seguridad

**Público Objetivo:** Equipo de desarrollo y equipo de Infraestructura

**Temas a Cubrir:**

1. **[Conceptos de Autenticación y Autorización](./Dia%201%20-%20Nivelación%20-%20Gestión%20de%20Usuarios%2C%20Roles%20y%20Seguridad/Material/1.%20Autenticación%20y%20autorización.md)**
    
    - Diferencias clave entre autenticación y autorización        
    - Relación entre estos conceptos y la arquitectura de seguridad        
    - Ejemplos de autenticación y autorización en Keycloak
        
2. **[Protocolos de SSO (Single Sign-On)](./Dia%201%20-%20Nivelación%20-%20Gestión%20de%20Usuarios%2C%20Roles%20y%20Seguridad/Material/2.%20Protocolos%20de%20SSO%20(Single%20Sign-On).md)**
    
    - Introducción a OpenID Connect: scopes y tokens        
    - Configuración avanzada de SAML: atributos personalizados        
    - Configuración práctica de SSO en aplicaciones web y móviles
    
3. **[Introducción a Keycloak y su Rol en la Infraestructura](./Dia%201%20-%20Nivelación%20-%20Gestión%20de%20Usuarios%2C%20Roles%20y%20Seguridad/Material/3.%20Introducción%20a%20Keycloak%20y%20su%20rol%20en%20la%20infraestructura.md)**
    
    - ¿Qué es Keycloak?        
    - Beneficios de usar Keycloak en la infraestructura empresarial        
    - Casos de uso: gestión de identidades y accesos en aplicaciones internas y externas

4. **[Introducción a Realms y Gestión de Identidades](./Dia%201%20-%20Nivelación%20-%20Gestión%20de%20Usuarios%2C%20Roles%20y%20Seguridad/Material/4.%20Configuración%20de%20Autenticación%20y%20Proveedores%20de%20Identidad.md)**
    
    - Creación y administración de realms        
    - Configuración de políticas de seguridad para un realm        
    - Diferencias entre realms aislados y compartidos
        
5. **[Configuración de Autenticación y Proveedores de Identidad](./Dia%201%20-%20Nivelación%20-%20Gestión%20de%20Usuarios%2C%20Roles%20y%20Seguridad/Material/5.%20Gestión%20de%20Usuarios%20y%20Roles.md)**
    
    - Flujos de autenticación configurables en Keycloak        
    - Integración con LDAP y Active Directory        
    - Configuración de autenticación federada con redes sociales
        
6. **[Gestión de Usuarios y Roles](./Dia%201%20-%20Nivelación%20-%20Gestión%20de%20Usuarios%2C%20Roles%20y%20Seguridad/Material/6.%20Introducción%20a%20Realms%20y%20Gestión%20de%20Identidades.md)**
    
    - Creación y asignación de roles estándar y compuestos        
    - Atributos personalizados para usuarios        
    - Organización de usuarios mediante grupos
        
7. **[Relación entre Autenticación, Autorización, Realms, Roles y Permisos](./Dia%201%20-%20Nivelación%20-%20Gestión%20de%20Usuarios%2C%20Roles%20y%20Seguridad/Material/7.%20Relación%20entre%20Autenticación%2C%20Autorización%2C%20Realms%2C%20Roles%20y%20Permisos.md)**
    
    - Cómo los roles definen permisos y accesos        
    - Uso de permisos en aplicaciones conectadas        
    - Escenarios prácticos para entender estas relaciones

### **Dia 2**: Implementación - Infraestructura y Despliegue de Keycloak

**Público Objetivo:** Equipo de Infraestructura

**Temas a Cubrir:**
        
1. **[Arquitecturas de Despliegue](./Dia%202%20-%20Implementación%20-%20Infraestructura%20y%20Despliegue%20de%20Keycloak/Material/1.%20Arquitecturas%20de%20Despliegue.md)**
    
    - Modos de operación: standalone y cluster        
    - Implementación On-premise vs. Cloud        
    - Arquitecturas de alta disponibilidad y recuperación ante desastres
        
2. **[Instalación y Configuración Inicial](./Dia%202%20-%20Implementación%20-%20Infraestructura%20y%20Despliegue%20de%20Keycloak/Material/2.%20Instalación%20y%20Configuración%20Inicial.md)**
    
    - Prerrequisitos: Java (versión soportada), Base de Datos, Contenedores (Docker/Podman)     
    - Pasos detallados de instalación        
    - Configuración inicial: crear administrador y ajustes básicos
        
3. **[Configuración de Base de Datos y Conexiones](./Dia%202%20-%20Implementación%20-%20Infraestructura%20y%20Despliegue%20de%20Keycloak/Material/3.%20Configuración%20de%20Base%20de%20Datos%20y%20Conexiones.md)**
    
    - Creación de una base de datos PostgreSQL y configuración en Keycloak        
    - Configuración alternativa con MySQL        
    - Estrategias de respaldo y recuperación de datos
        
4. **[Hardening y Seguridad](./Dia%202%20-%20Implementación%20-%20Infraestructura%20y%20Despliegue%20de%20Keycloak/Material/4.%20Hardening%20y%20Seguridad.md)**
    
    - Implementación de HTTPS mediante certificados SSL        
    - Configuración de cortafuegos y restricciones de acceso        
    - Buenas prácticas para contraseñas y políticas de usuarios

