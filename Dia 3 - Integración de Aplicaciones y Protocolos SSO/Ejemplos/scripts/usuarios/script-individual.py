from keycloak import KeycloakAdmin
from keycloak.exceptions import KeycloakGetError

# Configuración
KEYCLOAK_URL = "http://localhost:8000/"  # Cambiá esto si tu Keycloak está en otro host/puerto
REALM_NAME = "keycloak-bps-curso-dia-1"                 # Reemplazalo por el nombre de tu realm
ADMIN_USERNAME = "keycloak-admin"               # Usuario admin
ADMIN_PASSWORD = "admin"               # Contraseña admin
VERIFY_SSL = True                      # O False si estás en desarrollo y sin certificados SSL válidos

# Inicializar cliente admin
keycloak_admin = KeycloakAdmin(
    server_url=KEYCLOAK_URL,
    username=ADMIN_USERNAME,
    password=ADMIN_PASSWORD,
    realm_name=REALM_NAME,
    verify=VERIFY_SSL,
    user_realm_name="master",  # Usualmente el usuario admin está en el realm 'master'
)

# Datos del nuevo usuario
new_user = {
    "username": "usuario_nuevo",
    "email": "usuario@example.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "enabled": True,
    "emailVerified": True,
    "attributes": {
        "nroDocumento": ["12345678"],
        "legajo": ["12345678"],  # <-- Atributo custom
    },
    "credentials": [{
        "type": "password",
        "value": "Password123!",
        "temporary": False
    }]
}

# Crear usuario
try:
    user_id = keycloak_admin.create_user(new_user)
    print(f"Usuario creado con ID: {user_id}")
except KeycloakGetError as e:
    print(f"Error al crear usuario: {e}")
