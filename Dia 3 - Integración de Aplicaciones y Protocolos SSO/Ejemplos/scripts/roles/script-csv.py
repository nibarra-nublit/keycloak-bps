import json
from keycloak import KeycloakAdmin
from keycloak.exceptions import KeycloakGetError

# === Configuración de conexión ===
KEYCLOAK_URL = "http://localhost:8000/"
REALM_NAME = "keycloak-bps-curso-dia-1"
ADMIN_USERNAME = "keycloak-admin"
ADMIN_PASSWORD = "admin"
VERIFY_SSL = True
USER_REALM = "master"

# === Inicializar cliente admin ===
keycloak_admin = KeycloakAdmin(
    server_url=KEYCLOAK_URL,
    username=ADMIN_USERNAME,
    password=ADMIN_PASSWORD,
    realm_name=REALM_NAME, # <-- Realm sobre el que operamos (usuarios, roles, etc.)
    verify=VERIFY_SSL,
    user_realm_name=USER_REALM, # <-- Realm donde está el usuario admin
)

# === Cargar definición de roles desde archivo JSON ===
with open("roles.json", "r") as f:
    roles_config = json.load(f)

# === Crear Realm Roles ===
for role in roles_config.get("realm_roles", []):
    try:
        keycloak_admin.create_realm_role(role)
        print(f"Rol de realm creado: {role['name']}")
    except KeycloakGetError as e:
        if e.response_code == 409:
            print(f"ℹRol de realm ya existe: {role['name']}")
        else:
            print(f"Error creando rol de realm {role['name']}: {e}")

# === Crear Client Roles ===
for client_name, client_roles in roles_config.get("client_roles", {}).items():
    try:
        client_id = keycloak_admin.get_client_id(client_name)
        for role in client_roles:
            try:
                keycloak_admin.create_client_role(client_id, role)
                print(f"Rol de client '{client_name}' creado: {role['name']}")
            except KeycloakGetError as e:
                if e.response_code == 409:
                    print(f"Rol de client ya existe: {role['name']}")
                else:
                    print(f"Error creando rol de client {role['name']}: {e}")
    except KeycloakGetError as e:
        print(f"Error obteniendo client '{client_name}': {e}")

