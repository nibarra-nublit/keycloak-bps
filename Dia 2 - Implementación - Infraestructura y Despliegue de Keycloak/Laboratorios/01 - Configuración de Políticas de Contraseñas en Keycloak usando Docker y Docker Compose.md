### **Objetivo:**

1. **Levantar Keycloak en Docker usando Docker Compose**.
2. **Configurar políticas de contraseñas** para exigir:
    - **Longitud mínima de 10 caracteres**.
    - **Uso obligatorio de mayúsculas, números y caracteres especiales**.
3. **Intentar cambiar la contraseña de un usuario con una contraseña débil** y verificar que sea rechazada.
## **Prerrequisitos**

- Tener **Docker** y **Docker Compose** instalados en tu máquina.

## **Paso 1: Crear el archivo `docker-compose.yml`**

1. **Crea un directorio de trabajo** y accede a él:
   
```bash
mkdir keycloak-lab && cd keycloak-lab
```
    
2. **Crea un archivo `docker-compose.yml`** con el siguiente contenido:
    
```yaml
version: '3.8'

services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    container_name: keycloak
    command: start-dev
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=admin
    ports:
      - "8080:8080"
```
    
3. **Levanta el contenedor con Keycloak**:
    
```bash
docker-compose up -d
```
    
4. **Verifica que Keycloak está corriendo**:

```bash
docker ps
```

## **Paso 2: Acceder a Keycloak y Crear un Nuevo Realm**

1. **Abre tu navegador** e ingresa a:
    
```
http://localhost:8080/
```
    
2. **Inicia sesión** con:
    - **Usuario**: `admin`
    - **Contraseña**: `admin`
3. **Crea un nuevo Realm** llamado `curso-realm`:
    - En el menú superior izquierdo, selecciona **"Add Realm"**.
    - **Nombre**: `curso-realm`.
    - Presiona **"Create"**.
## **Paso 3: Configurar la Política de Contraseñas**

1. **Selecciona el `curso-realm`** en la parte superior izquierda.
2. Ve a **"Authentication"** en el menú lateral.
3. Haz clic en la pestaña **"Password Policy"**.
4. Agrega las siguientes reglas presionando **"Add Policy"**:
    - **Password Length**:
        - Valor: `10`
        - Descripción: La contraseña debe tener al menos **10 caracteres**.
    - **Uppercase Characters**:
        - Valor: `1`
        - Descripción: Se requiere al menos **una letra mayúscula**.
    - **Digits**:
        - Valor: `1`
        - Descripción: Se requiere al menos **un número**.
    - **Special Characters**:
        - Valor: `1`
        - Descripción: Se requiere al menos **un carácter especial**.
5. **Guarda los cambios**.
## **Paso 4: Crear un Usuario y Probar la Política de Contraseñas**

1. Ve a **"Users"** en el menú lateral.
2. Haz clic en **"Add User"** y completa los siguientes datos:
    - **Username**: `usuario1`
    - **Email**: `usuario1@example.com`
    - **First Name**: `Usuario`
    - **Last Name**: `Prueba`
    - **Habilitado**: ✅ (Activado)
    - Presiona **"Save"**.
3. Ve a la pestaña **"Credentials"** y establece una contraseña:
    - Intenta poner: `abc123` (contraseña débil).
    - **Resultado esperado**: Keycloak debe rechazarla.
    - Ahora intenta con: `Aqz@123456`.
    - **Resultado esperado**: Keycloak debe aceptarla.
4. **Verifica que el usuario pueda autenticarse** en:
   
```bash
http://localhost:8080/realms/curso-realm/account
```
## **Paso 5: Validación Final**

- Intenta cambiar la contraseña a otra que no cumpla las reglas (ejemplo: `12345678`) y verifica que **Keycloak la rechaza**.
- Intenta cambiarla a una que cumpla con la política y verifica que **Keycloak la acepta**.