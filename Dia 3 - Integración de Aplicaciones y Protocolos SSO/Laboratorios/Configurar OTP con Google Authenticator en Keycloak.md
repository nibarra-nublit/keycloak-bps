### Prerrequisitos

- Docker y Docker Compose (opcional, pero recomendado)
- Navegador web
- Dispositivo móvil con Google Authenticator (Android o iOS)
- Keycloak 26 (puede estar ya desplegado en local o en servidor)

## 1. Desplegar Keycloak con Docker (opcional)

```bash
docker run -d --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.0.0 \
  start-dev
```
Accede a `http://localhost:8080` y loguéate con:

- Usuario: `admin`
- Contraseña: `admin`

## 2. Crear un Realm y Usuario de Prueba

1. Entra al **Admin Console**
2. Crea un nuevo Realm:
    - `Realm name`: `otp-demo`
3. Ve a **Users > Add user**
    - Username: `testuser`
    - Email: `test@example.com`
    - Habilitado: ✅
4. Ve a la pestaña **Credentials**
    - Establece una contraseña: `test123`
    - Marca `Temporary` como ❌ (desactiva)
    - Haz clic en "Set Password"

## 3. Habilitar OTP (Two-Factor Authentication)

### Opción A: Hacerlo Requerido para Todos

1. Ve a **Authentication > Required Actions**
2. Asegúrate de que `Configure OTP` esté habilitado (`Enabled = ON`)
3. Ve a **Authentication > Flows**
4. Abre el flujo `Browser`
    - Verás un subflujo llamado `Browser Forms`
    - Haz clic en `Actions > Add execution` (si es que no existe)
    - Selecciona `OTP Form`
    - Marca el nuevo `OTP Form` como **REQUIRED**


**Aclaración:** En las ultimas versiones de Keycloak, el flujo ya viene configurado, lo único que hay que hacer es habilitarlo.
Para ello lo que hay que hacer es marcar como requerido el campo Browser - Conditional OTP

### Opción B: Hacerlo Opcional (Requiere que el usuario lo configure)

Esto ya está habilitado por defecto. Si quieres que sea **opcional**, no marques `OTP Form` como `REQUIRED`, simplemente asegúrate de que `Configure OTP` esté habilitado como `Required Action`.

---

## 4. Simular Login e Inscribir OTP

1. Ve a `http://localhost:8080/realms/otp-demo/account`
2. Inicia sesión con:
    - Usuario: `testuser`
    - Contraseña: `test123`
3. Keycloak solicitará **configurar OTP**
    - Escanea el QR code con **Google Authenticator**
    - Ingresa el código temporal generado