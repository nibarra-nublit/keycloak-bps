### **Objetivo**

1. **Levantar Keycloak en Docker** y configurar un **realm**.
2. Configurar una **aplicación cliente SAML** en Keycloak.
3. Modificar **atributos personalizados** en la respuesta SAML.
4. **Validar la autenticación** en una aplicación de prueba con SAML.
## **Requisitos**

- Tener **Docker y Docker Compose** instalados.
- Conocimientos básicos de Keycloak.
## **Paso 1: Levantar Keycloak con Docker**

1. Crea un archivo `docker-compose.yml` con el siguiente contenido:
   
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
    volumes:
      - keycloak_data:/opt/keycloak/data
    
volumes:
  keycloak_data:
```
    
2. **Inicia el contenedor** de Keycloak:
   
```bash
docker-compose up -d    
```
    
3. **Accede a la consola de administración** de Keycloak en tu navegador:
    
```bash
http://localhost:8080/
```
    
Usuario: `admin` Contraseña: `admin`
## **Paso 2: Crear un Realm y Configurar SAML**

1. **Inicia sesión** en Keycloak y **crea un nuevo Realm** llamado `saml-realm`.
    - En el menú de la izquierda, haz clic en **"Realm Settings"** > **"Add Realm"**.
    - Nombre: `saml-realm` → Guardar.
2. **Crea un Cliente SAML**:
    - Ve a **"Clients"** → **"Create"**.
    - **Client ID**: `saml-client`
    - **Client Protocol**: `SAML`
    - **Root URL**: `http://localhost:8081`
    - **Save**.
3. **Configurar SAML en el Cliente**:
    - Ve a la pestaña **"Settings"**.
    - Activa:
        - `Sign Assertions` (Firmar afirmaciones)
        - `Sign Documents`
        - `Force Name ID Format`
    - **Name ID Format**: `email`
    - **Valid Redirect URIs**: `http://localhost:8081/*`
    - **Base URL**: `http://localhost:8081`
    - Guarda los cambios.
## **Paso 3: Agregar Atributos Personalizados a la Respuesta SAML**

1. **Ve a la pestaña "Mappers"** del cliente `saml-client`.
2. **Crea un nuevo Mapper**:
    - Nombre: `custom-attribute`
    - **Mapper Type**: "User Attribute"
    - **User Attribute**: `department`
    - **SAML Attribute Name**: `custom_department`
    - **SAML Attribute NameFormat**: `Basic`
    - **Add to ID Token**: ✅ Sí
    - **Add to Assertion**: ✅ Sí
    - Guardar.
3. **Asigna el atributo personalizado a un usuario**:
    - Ve a **Users** > **Selecciona un usuario**.
    - **En la pestaña "Attributes"**, agrega:
        - Key: `department`
        - Value: `IT`
    - Guardar.
## **Paso 4: Validar la Respuesta SAML en una Aplicación**

### **Levantar una Aplicación PHP SAML en Docker**

1. **Crea una carpeta para la aplicación**:
   
```bash
mkdir saml-app && cd saml-app
```
    
2. **Crea un archivo `docker-compose.yml`** para la aplicación:
    
```yaml
version: '3.8'

services:
  php-saml:
    image: jonk/server-simplesamlphp
    container_name: php-saml
    ports:
      - "8081:80"

```
    
3. **Levanta la aplicación**:
    
```bash
docker-compose up -d
```
    
4. **Accede a SimpleSAML en el navegador**:

```bash
http://localhost:8081/simplesaml
```
    
Usuario: `admin` Contraseña: `password`
## **Paso 5: Configurar Keycloak como IdP en SimpleSAML**

1. **Descarga los metadatos de Keycloak**:
    - En Keycloak, ve a `Clients > saml-client > SAML Keys` y copia la URL de `SAML 2.0 Service Provider Metadata`.
2. **Configura el proveedor de identidad en SimpleSAML**:
    - Edita el archivo `saml20-idp-remote.php` en el contenedor de SimpleSAML:
      
```bash
docker exec -it php-saml bash
nano /var/simplesamlphp/metadata/saml20-idp-remote.php
```

    - Agrega:
        
```php
$metadata['http://localhost:8080/realms/saml-realm/protocol/saml'] = [
    'SingleSignOnService'  => 'http://localhost:8080/realms/saml-realm/protocol/saml',
    'SingleLogoutService'  => 'http://localhost:8080/realms/saml-realm/protocol/saml',
    'certFingerprint'      => '<TU_FINGERPRINT>',
    'NameIDFormat'         => 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
];
```
        
    - Guarda y reinicia el contenedor.
## **Paso 6: Prueba la Autenticación SAML**

1. **Accede a la aplicación**:
    
```
http://localhost:8081/simplesaml
```
    
2. **Inicia sesión con Keycloak**:
    - Selecciona "Test Authentication Sources".
    - Selecciona `saml-client`.
    - Inicia sesión con un usuario de Keycloak.
3. **Verifica los atributos recibidos**:
    - En la respuesta SAML, deberías ver el atributo personalizado `custom_department=IT`.