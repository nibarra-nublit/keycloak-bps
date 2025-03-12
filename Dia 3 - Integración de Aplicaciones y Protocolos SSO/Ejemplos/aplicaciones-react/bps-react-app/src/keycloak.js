import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8000',
  realm: 'keycloak-bps-curso-dia-1',
  clientId: 'bps-react-app',
});

export default keycloak;
