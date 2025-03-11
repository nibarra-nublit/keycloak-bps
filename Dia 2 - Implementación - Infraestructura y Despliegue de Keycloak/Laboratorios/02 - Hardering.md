
### **Objetivo:**

1. **Levantar Keycloak en Docker usando Docker Compose**.
2. Configurar un certificado SSL para que sea usando como punto de acceso a la aplicación

## **Prerrequisitos**

- Tener **Docker** y **Docker Compose** instalados en tu máquina.

## **Paso 1: Crear certificado SSL con OpenSSL**

1. **Abre una terminal y ejecuta**:
   
```bash
openssl req -newkey rsa:2048 -nodes -keyout keycloak.key -x509 -days 365 -out keycloak.crt
```
    
1. **Completa los valores** (o déjalos vacíos):
    
```bash
Country Name (2 letter code) [AU]: US
State or Province Name (full name) [Some-State]: California
Locality Name (eg, city) []: San Francisco
Organization Name (eg, company) [Internet Widgits Pty Ltd]: Mi Empresa
Organizational Unit Name (eg, section) []: TI
Common Name (e.g. server FQDN or YOUR name) []: localhost
Email Address []: admin@example.com
```
    
2. **Verifica que se generaron los archivos**:
   
```bash
ls -l keycloak.*
```
    
    Deberías ver:
    
```bash
keycloak.crt  # Certificado SSL
keycloak.key  # Clave privada
```

## **Paso 2: Modificar archivo docker-compose**

1. **Crea una carpeta de trabajo y accede a ella**:
    
```bash
mkdir keycloak-nginx && cd keycloak-nginx
```
    
2. **Mueve los archivos generados al directorio**:
   
```bash
mv ~/keycloak.crt ~/keycloak.key .
```
   
3. Copiar los archivos del ejemplo de keycloak levantado en modo cluster con docker.
4. Modificar el nombre del hostname de los servicios de keycloak que componen el cluster:
   
   Esta linea:
   
```
   - KC_HOSTNAME=http://localhost:8000/
```
   
   Debe quedar de la siguiente forma:
   
```
	- KC_HOSTNAME=https://keycloak.local/
```

5. Modificar el archivo docker-compose.yml, se debe agregar las siguientes lineas en los volumenes del servicio de nginx:
   
```yml
- ./keycloak.crt:/etc/ssl/certs/keycloak.crt:ro
- ./keycloak.key:/etc/ssl/private/keycloak.key:ro 
```

## **Paso 3: Configurar NGINX como Proxy Reverso**

1. Configurar el uso de los certificados ssl en nginx:
   
```json
events {}

http {
    upstream keycloak {
        server kc1:8080;
        server kc2:8080;
    }
  
    server {
        listen 443 ssl; 
        server_name keycloak.local; 
        ssl_certificate /etc/ssl/certs/keycloak.crt;
		ssl_certificate_key /etc/ssl/private/keycloak.key;
  
        location / {
            proxy_pass http://keycloak;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## **Paso 4: Levantar los Contenedores**

1. **Ejecuta Docker Compose**:
    
```bash
docker-compose up -d
```
    
2. **Verifica que los contenedores están corriendo**:
    
```bash
docker ps
```

## **Paso 5: Configurar el Archivo Hosts (Opcional)**

Si deseas acceder a Keycloak con `https://keycloak.local`, agrega la siguiente línea en tu archivo **hosts** (`/etc/hosts` en Linux/Mac o `C:\Windows\System32\drivers\etc\hosts` en Windows):

```lua
127.0.0.1 keycloak.local
```
## **Paso 6: Acceder a Keycloak con HTTPS**

1. **Abre el navegador** e ingresa a:
    
```
https://keycloak.local/
```
    
2. **Ignora la advertencia del navegador**:
    - Como el certificado es **autogenerado**, los navegadores lo marcan como "No Seguro".
    - Haz clic en **"Avanzado"** > **"Continuar a keycloak.local"**.
3. **Inicia sesión con**:
    - **Usuario**: `admin`
    - **Contraseña**: `admin`